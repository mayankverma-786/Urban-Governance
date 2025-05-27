from transformers import pipeline

# Load pre-trained summarization model
summarizer = pipeline("summarization")

def summarize_text(text):
    # Ensure input isn't too long
    if len(text.split()) > 512:
        text = " ".join(text.split()[:512])

    summary = summarizer(text, max_length=100, min_length=30, do_sample=False)
    return summary[0]['summary_text']
