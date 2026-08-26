from pathlib import Path
from io import BytesIO
from zipfile import ZipFile
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "RB-DW-017": [
        (Path(r"C:\Users\16621\Downloads\Desktop\水杯素材（拍摄）\IMG_9069.jpeg"), "Black rhinestone tumbler with pink heart decoration"),
        (Path(r"C:\Users\16621\Downloads\Desktop\水杯素材（拍摄）\IMG_9071.jpeg"), "Handheld view of the black rhinestone tumbler with pink heart decoration"),
        (Path(r"C:\Users\16621\Downloads\Desktop\水杯素材（拍摄）\IMG_9074.jpeg"), "Black rhinestone tumbler with pink heart decoration and handle"),
    ],
    "RB-PB-008": [
        (Path(r"C:\Users\16621\Downloads\Desktop\药瓶&药盒\七天分格药盒  (1).jpg"), "Closed crystal seven-day pill organizer in hand"),
        (Path(r"C:\Users\16621\Downloads\Desktop\药瓶&药盒\七天分格药盒 (2).jpg"), "Opened crystal seven-day pill organizer showing inner compartments"),
        (Path(r"C:\Users\16621\Downloads\Desktop\药瓶&药盒\七天分格药盒 (4).jpg"), "Crystal seven-day pill organizer opened from above"),
    ],
    "RB-PB-009": [
        (Path(r"C:\Users\16621\Downloads\Desktop\药瓶&药盒\三格药盒 (1).jpg"), "Three-compartment rhinestone pill box opened in hand"),
        (Path(r"C:\Users\16621\Downloads\Desktop\药瓶&药盒\三格药盒 (2).jpg"), "Three-compartment rhinestone pill box with lid open"),
        (Path(r"C:\Users\16621\Downloads\Desktop\药瓶&药盒\三格药盒 (3).jpg"), "Closed three-compartment rhinestone pill box in hand"),
    ],
}

# These files were explicitly confirmed by the site owner for the Batch 02
# mirror and rhinestone-clog product galleries.  They stay in the supplied ZIP
# as original source material; only optimized WebP copies are written to the
# website asset folders below.
ARCHIVE = Path(r"C:\Users\16621\Downloads\Desktop\Rhinobling自建站产品\batch02-real-images.zip")
ARCHIVE_SOURCES = {
    "RB-MR-001": [
        ("batch02-real-images/bling mirror  (1).png", "Pink rectangular rhinestone hand mirror with a custom graphic"),
        ("batch02-real-images/bling mirror  (2).png", "Black rectangular rhinestone hand mirror with custom lettering"),
        ("batch02-real-images/bling mirror3.jpg", "Black rectangular rhinestone hand mirror shown as a custom design example"),
        ("batch02-real-images/bling mirror  (3).png", "Iridescent rectangular rhinestone hand mirror with a custom logo"),
    ],
    "RB-MR-004": [
        ("batch02-real-images/bling mirror  (1).png", "Pink rectangular rhinestone hand mirror with a custom graphic"),
        ("batch02-real-images/bling mirror  (2).png", "Black rectangular rhinestone hand mirror with custom lettering"),
        ("batch02-real-images/bling mirror3.jpg", "Black rectangular rhinestone hand mirror shown as a custom design example"),
    ],
    "RB-FS-001": [
        ("batch02-real-images/Bling Crocs (9).jpg", "Rhinestone bling clogs shown in a product collection"),
        ("batch02-real-images/rhinestone crocs (10).jpeg", "Rhinestone bling clogs with decorative bows"),
        ("batch02-real-images/rhinestone crocs (5).jpeg", "Rhinestone bling clogs with a patterned upper"),
        ("batch02-real-images/rhinestone crocs (6).jpeg", "Rhinestone bling clogs with a logo-style decoration"),
    ],
    "RB-DW-017": [
        ("batch02-real-images/20241122172705.jpg", "Black and pink heart rhinestone tumbler shown with related drinkware designs"),
    ],
    "RB-BT-001": [
        ("batch02-real-images/IMG_7083.jpeg", "Pink rhinestone makeup brushes and matching beauty accessories"),
        ("batch02-real-images/未命名图片 (2).jpg", "Pink rhinestone makeup brush gift set shown in a presentation box"),
        ("batch02-real-images/未命名图片.png", "Pink rhinestone makeup brush gift set with coordinating accessories"),
    ],
}

for product_id, images in SOURCES.items():
    output_dir = ROOT / "assets" / "images" / "product-batch02" / product_id
    output_dir.mkdir(parents=True, exist_ok=True)
    for number, (source, _alt) in enumerate(images, start=2):
        with Image.open(source) as original:
            image = original.convert("RGB")
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image.save(output_dir / f"{product_id}-{number:02d}.webp", "WEBP", quality=86, method=6)

with ZipFile(ARCHIVE) as archive:
    for product_id, images in ARCHIVE_SOURCES.items():
        output_dir = ROOT / "assets" / "images" / "product-batch02" / product_id
        output_dir.mkdir(parents=True, exist_ok=True)
        start_number = 5 if product_id == "RB-DW-017" else 2
        for number, (source_name, _) in enumerate(images, start=start_number):
            with Image.open(BytesIO(archive.read(source_name))) as original:
                image = original.convert("RGB")
                image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                image.save(output_dir / f"{product_id}-{number:02d}.webp", "WEBP", quality=86, method=6)
