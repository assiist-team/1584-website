#!/usr/bin/env python3
"""
Image optimization script for 1584 Design website mobile-first refactor.
Generates WebP derivatives at multiple sizes for responsive images.

Usage:
    python3 batch_resize.py
"""

from pathlib import Path
from PIL import Image
import os

# Target widths by category as specified in mobile-first refactor plan
HERO_WIDTHS = [320, 640, 960, 1280, 1600, 1920]
PORTFOLIO_CARD_WIDTHS = [320, 480, 640, 768]
ABOUT_WIDTHS = [480, 768, 1024]

# WebP quality settings (60-75 for WebP as recommended)
WEBP_QUALITY = 75

def resize_to_widths(src_path: Path, dest_dir: Path, widths: list, format="WEBP"):
    """Resize image to multiple widths and save as WebP."""
    dest_dir.mkdir(parents=True, exist_ok=True)

    try:
        with Image.open(src_path) as im:
            # Convert to RGB if necessary (handles PNG with transparency)
            if im.mode != "RGB":
                im = im.convert("RGB")

            basename = src_path.stem

            for width in widths:
                # Calculate height maintaining aspect ratio
                ratio = width / im.width
                height = int(im.height * ratio)

                # Resize using high-quality resampling
                resized = im.resize((width, height), resample=Image.LANCZOS)

                # Save as WebP
                output_path = dest_dir / f"{basename}-{width}.webp"
                resized.save(output_path, format=format, quality=WEBP_QUALITY, method=6)
                print(f"  ✓ Generated {output_path} ({width}×{height}px)")

    except Exception as e:
        print(f"  ✗ Error processing {src_path}: {e}")

def process_hero_images():
    """Process hero background images."""
    print("Processing hero images...")

    hero_source_dir = Path("images/stoddards")
    hero_dest_dir = Path("images_optimized/hero")

    hero_images = [
        "DSC06405.jpg",  # Main hero background
        "DSC06177-HDR copy 5.jpg"  # Social proof section background
    ]

    for image_name in hero_images:
        src_path = hero_source_dir / image_name
        if src_path.exists():
            # Create subdirectory for this image
            image_dest_dir = hero_dest_dir / src_path.stem
            resize_to_widths(src_path, image_dest_dir, HERO_WIDTHS)
        else:
            print(f"  ✗ Hero image not found: {src_path}")

def process_portfolio_card_images():
    """Process portfolio category card images."""
    print("Processing portfolio card images...")

    card_source_dir = Path("images/portfolio_category_cards")
    card_dest_dir = Path("images_optimized/portfolio/cards")

    card_images = [
        "DSC06420-HDR.jpg",  # Bedrooms
        "DSC06355-HDR.jpg",  # Living Spaces
        "DSC06465-HDR.jpg"   # More Spaces
    ]

    for image_name in card_images:
        src_path = card_source_dir / image_name
        if src_path.exists():
            # Create subdirectory for this image
            image_dest_dir = card_dest_dir / src_path.stem
            resize_to_widths(src_path, image_dest_dir, PORTFOLIO_CARD_WIDTHS)
        else:
            print(f"  ✗ Portfolio card image not found: {src_path}")

def process_texture_images():
    """Process texture and background images."""
    print("Processing texture images...")

    texture_source_dir = Path("images/textures")
    texture_dest_dir = Path("images_optimized/about")  # Using about dir for textures

    texture_images = [
        "A___responsive_2560_1440.jpg",
        "fabric-cosmos-mushroom-plain-flat_51.jpg",
        "bernard-hermant-u7VDgNGb78w-unsplash.jpg"
    ]

    for image_name in texture_images:
        src_path = texture_source_dir / image_name
        if src_path.exists():
            # Create subdirectory for this image
            image_dest_dir = texture_dest_dir / src_path.stem
            resize_to_widths(src_path, image_dest_dir, ABOUT_WIDTHS)
        else:
            print(f"  ✗ Texture image not found: {src_path}")

def main():
    """Main processing function."""
    print("🚀 Starting image optimization for 1584 Design mobile-first refactor")
    print("=" * 70)

    # Process all image categories
    process_hero_images()
    process_portfolio_card_images()
    process_texture_images()

    print("=" * 70)
    print("✅ Image optimization complete!")
    print("\nGenerated WebP derivatives for:")
    print(f"  • Hero images: {len(HERO_WIDTHS)} sizes each ({HERO_WIDTHS})")
    print(f"  • Portfolio cards: {len(PORTFOLIO_CARD_WIDTHS)} sizes each ({PORTFOLIO_CARD_WIDTHS})")
    print(f"  • Texture images: {len(ABOUT_WIDTHS)} sizes each ({ABOUT_WIDTHS})")
    print("\nNext steps:")
    print("  1. Review generated images in images_optimized/")
    print("  2. Update HTML to use <picture> elements with srcset")
    print("  3. Test responsive behavior across breakpoints")

if __name__ == "__main__":
    main()
