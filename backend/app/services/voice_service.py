from gtts import gTTS

def generate_voice(text, output_path):

    tts = gTTS(text=text, lang='en')

    tts.save(output_path)

    return output_path