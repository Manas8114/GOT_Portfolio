import os
import random

try:
    from PIL import Image
    
    public_dir = r"c:\Users\msgok\OneDrive\Desktop\Project\portfolio\public"
    os.makedirs(public_dir, exist_ok=True)
    
    # 1. Generate noise.png (256x256 monochrome noise with alpha)
    noise_size = 256
    noise_img = Image.new('RGBA', (noise_size, noise_size))
    pixels = noise_img.load()
    
    for i in range(noise_size):
        for j in range(noise_size):
            val = random.randint(0, 255)
            # Subtle noise for overlay
            pixels[i, j] = (val, val, val, random.randint(15, 30))
            
    noise_path = os.path.join(public_dir, 'noise.png')
    noise_img.save(noise_path)
    print(f"Created: {noise_path}")
    
    # 2. Generate grid.png (64x64 transparent with black border on right/bottom)
    grid_size = 64
    grid_img = Image.new('RGBA', (grid_size, grid_size), (0, 0, 0, 0))
    pixels2 = grid_img.load()
    
    for i in range(grid_size):
        for j in range(grid_size):
            if i == grid_size - 1 or j == grid_size - 1:
                pixels2[i, j] = (0, 0, 0, 80)
                
    grid_path = os.path.join(public_dir, 'grid.png')
    grid_img.save(grid_path)
    print(f"Created: {grid_path}")
    print("Assets generated successfully.")
    
except ImportError:
    print("WARNING: Pillow not installed. Could not generate images programmatically.")
    print("Please run: pip install Pillow")
