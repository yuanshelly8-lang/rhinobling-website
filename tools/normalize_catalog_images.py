from pathlib import Path
import re
from PIL import Image, ImageChops, ImageFilter, ImageOps

SITE = Path(__file__).resolve().parents[1]
HTML_FILES = [SITE / "products.html", *SITE.glob("category-*.html")]


def referenced_images():
    found = set()
    pattern = re.compile(r'src="(assets/images/[^\"]+\.(?:webp|jpg|jpeg|png))"', re.I)
    for html in HTML_FILES:
        if not html.exists():
            continue
        found.update(pattern.findall(html.read_text(encoding="utf-8")))
    return sorted(SITE / item for item in found)


def content_box(image):
    rgb = image.convert("RGB")
    # Product assets mostly use white or pale-pink studio backgrounds. Estimate
    # that background from the four corners, then keep pixels that differ enough.
    corners = [rgb.getpixel((0, 0)), rgb.getpixel((rgb.width - 1, 0)),
               rgb.getpixel((0, rgb.height - 1)), rgb.getpixel((rgb.width - 1, rgb.height - 1))]
    bg = tuple(sum(pixel[channel] for pixel in corners) // 4 for channel in range(3))
    background = Image.new("RGB", rgb.size, bg)
    diff = ImageChops.difference(rgb, background).convert("L")
    mask = diff.point(lambda value: 255 if value > 12 else 0)
    mask = mask.filter(ImageFilter.MaxFilter(7))
    bbox = mask.getbbox()
    if not bbox:
        return (0, 0, rgb.width, rgb.height)
    left, top, right, bottom = bbox
    # Ignore tiny corner marks and avoid excessive cropping of lifestyle photos.
    if (right - left) * (bottom - top) < rgb.width * rgb.height * 0.08:
        return (0, 0, rgb.width, rgb.height)
    pad_x = max(8, int((right - left) * 0.025))
    pad_y = max(8, int((bottom - top) * 0.025))
    return (max(0, left - pad_x), max(0, top - pad_y),
            min(rgb.width, right + pad_x), min(rgb.height, bottom + pad_y))


def normalize(path):
    with Image.open(path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        crop = image.crop(content_box(image))
        # `thumbnail` never enlarges a small crop. Resize explicitly so the
        # isolated product occupies the canvas instead of staying thumbnail-size.
        scale = min(1140 / crop.width, 1140 / crop.height)
        crop = crop.resize((max(1, round(crop.width * scale)),
                            max(1, round(crop.height * scale))),
                           Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (1200, 1200), "white")
        canvas.paste(crop, ((1200 - crop.width) // 2, (1200 - crop.height) // 2))
        canvas.save(path, "WEBP", quality=90, method=6)


if __name__ == "__main__":
    paths = [path for path in referenced_images() if path.exists() and path.suffix.lower() == ".webp"]
    for path in paths:
        normalize(path)
    print(f"Normalized {len(paths)} catalog images")
