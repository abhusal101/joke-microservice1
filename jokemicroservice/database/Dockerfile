# Use the official MySQL 8.0 image as base image
FROM mysql:8.0

# Set the root password for MySQL
ENV MYSQL_ROOT_PASSWORD=root_password

# Create a database named 'jokesdb' when the container starts
ENV MYSQL_DATABASE=jokesdb

# Copy the initialization script into the Docker image
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Expose port 3306 to allow external connections
EXPOSE 3306
