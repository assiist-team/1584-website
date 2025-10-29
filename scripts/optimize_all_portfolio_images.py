#!/usr/bin/env python3
"""
Script to download and optimize ALL external portfolio images for responsive use.
"""
import os
import re
import requests
from pathlib import Path
from PIL import Image
from urllib.parse import urlparse

# Target sizes for responsive images
TARGET_SIZES = [320, 480, 640, 768, 1024, 1280, 1536, 1920]
WEBP_QUALITY = 75

def extract_image_urls_from_html(html_file):
    """Extract all portfolio image URLs from the HTML file."""
    with open(html_file, 'r') as f:
        content = f.read()

    # Find all Google Storage URLs in the portfolio data
    pattern = r'https://storage\.googleapis\.com/msgsndr/[^\'"\s]+'
    urls = re.findall(pattern, content)

    # Remove duplicates and return
    return list(set(urls))

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

                print(f"  Created {output_path} ({size}x{new_height})")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def main():
    print("Extracting portfolio image URLs from HTML...")

    # Extract all unique image URLs from portfolio.html
    image_urls = extract_image_urls_from_html('portfolio.html')

    print(f"Found {len(image_urls)} unique portfolio images")

    temp_dir = Path('temp_downloads')
    temp_dir.mkdir(exist_ok=True)

    optimized_count = 0

    for i, url in enumerate(image_urls):
        print(f"\nProcessing image {i+1}/{len(image_urls)}: {url}")

        # Extract filename from URL
        parsed = urlparse(url)
        filename = parsed.path.split('/')[-1]
        filename_base = filename.replace('.jpeg', '').replace('.jpg', '')

        # Skip if already optimized
        output_dir = Path('images_optimized/portfolio/gallery')
        if (output_dir / f"{filename_base}-1024.webp").exists():
            print("  Already optimized, skipping...")
            continue

        # Download image
        temp_path = temp_dir / filename
        if download_image(url, temp_path):
            # Create optimized versions
            create_responsive_versions(temp_path, 'images_optimized/portfolio/gallery', filename_base)
            optimized_count += 1

            # Clean up temp file
            temp_path.unlink()

    # Clean up temp directory if empty
    try:
        temp_dir.rmdir()
    except OSError:
        pass  # Directory not empty, keep it

    print(f"\nPortfolio image optimization complete! Optimized {optimized_count} new images.")

if __name__ == "__main__":
    main()
