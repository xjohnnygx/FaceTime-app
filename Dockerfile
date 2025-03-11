# Use the official Python image
FROM python:3.12.2

# Set the working directory
WORKDIR /FaceTime-app

# Copy the rest of the application
COPY . .

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Run the application
CMD ["python", "main.py"]