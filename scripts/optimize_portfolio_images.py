#!/usr/bin/env python3
"""
Script to download and optimize external portfolio images for responsive use.
"""
import os
import requests
from pathlib import Path
from PIL import Image
from urllib.parse import urlparse

# Target sizes for responsive images
TARGET_SIZES = [320, 480, 640, 768, 1024, 1280, 1536, 1920]
WEBP_QUALITY = 75

def download_image(url, output_path):
    """Download an image from URL to local path."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        with open(output_path, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def create_responsive_versions(image_path, output_dir, filename_base):
    """Create multiple WebP versions of an image at different sizes."""
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        with Image.open(image_path) as im:
            # Convert to RGB if necessary
            if im.mode != 'RGB':
                im = im.convert('RGB')

            for size in TARGET_SIZES:
                # Calculate dimensions maintaining aspect ratio
                width_ratio = size / im.width
                new_height = int(im.height * width_ratio)

                # Resize image
                resized = im.resize((size, new_height), resample=Image.LANCZOS)

                # Save as WebP
                output_path = output_dir / f"{filename_base}-{size}.webp"
                resized.save(output_path, format='WEBP', quality=WEBP_QUALITY)

                print(f"Created {output_path} ({size}x{new_height})")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def main():
    # Sample of portfolio image URLs to optimize
    sample_urls = [
        'https://storage.googleapis.com/msgsndr/zTjqcEq3Ndj90wvhfc47/media/67688134fb63bc08086c4f37.jpeg',
        'https://storage.googleapis.com/msgsndr/zTjqcEq3Ndj90wvhfc47/media/6768813446935194065480f7.jpeg',
        'https://storage.googleapis.com/msgsndr/zTjqcEq3Ndj90wvhfc47/media/676881342fc195532a4ae6c9.jpeg',
        'https://storage.googleapis.com/msgsndr/zTjqcEq3Ndj90wvhfc47/media/676881347e621110c2b123c8.jpeg',
        'https://storage.googleapis.com/msgsndr/zTjqcEq3Ndj90wvhfc47/media/6768973efb63bc73986c7afb.jpeg'
    ]

    temp_dir = Path('temp_downloads')
    temp_dir.mkdir(exist_ok=True)

    for i, url in enumerate(sample_urls):
        print(f"\nProcessing image {i+1}/{len(sample_urls)}: {url}")

        # Extract filename from URL
        parsed = urlparse(url)
        filename = parsed.path.split('/')[-1]
        filename_base = filename.replace('.jpeg', '').replace('.jpg', '')

        # Download image
        temp_path = temp_dir / filename
        if download_image(url, temp_path):
            # Create optimized versions
            create_responsive_versions(temp_path, 'images_optimized/portfolio/gallery', filename_base)

            # Clean up temp file
            temp_path.unlink()

    # Clean up temp directory
    temp_dir.rmdir()

    print("\nPortfolio image optimization complete!")

if __name__ == "__main__":
    main()
