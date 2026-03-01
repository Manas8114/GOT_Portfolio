import os
import wave
import math
import random
import struct

def generate_wav(filepath, duration, sample_rate, wave_type, freq=440.0):
    num_samples = int(duration * sample_rate)
    
    with wave.open(filepath, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            t = float(i) / sample_rate
            
            if wave_type == 'bamboo':
                # Fast decay, high pitch percussive
                envelope = math.exp(-25.0 * t)
                value = math.sin(2.0 * math.pi * 800.0 * t) * envelope
            elif wave_type == 'wood':
                # Fast decay, low pitch percussive
                envelope = math.exp(-20.0 * t)
                value = math.sin(2.0 * math.pi * 300.0 * t) * envelope
            elif wave_type == 'wind':
                # White noise with soft attack/release
                envelope = 1.0
                if t < 0.2:
                    envelope = t / 0.2
                elif t > duration - 0.5:
                    envelope = (duration - t) / 0.5
                value = (random.random() * 2.0 - 1.0) * envelope * 0.5
            else:
                value = 0
                
            # Convert to 16-bit integer
            sample_val = int(value * 32767.0)
            # Clamp
            sample_val = max(-32768, min(32767, sample_val))
            
            wav_file.writeframesraw(struct.pack('<h', sample_val))

if __name__ == "__main__":
    public_sounds_dir = r"c:\Users\msgok\OneDrive\Desktop\Project\portfolio\public\sounds"
    os.makedirs(public_sounds_dir, exist_ok=True)
    
    generate_wav(os.path.join(public_sounds_dir, 'bamboo-tap.wav'), 0.2, 44100, 'bamboo')
    generate_wav(os.path.join(public_sounds_dir, 'wood-tap.wav'), 0.3, 44100, 'wood')
    generate_wav(os.path.join(public_sounds_dir, 'wind-soft.wav'), 1.5, 44100, 'wind')
    generate_wav(os.path.join(public_sounds_dir, 'wind-ambient.wav'), 4.0, 44100, 'wind')
    
    print("Synthesized audio files created successfully in public/sounds.")
