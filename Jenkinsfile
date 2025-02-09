pipeline {
    agent any

    environment {
        NODE_VERSION = '14' // Specify the Node.js version
        NPM_CONFIG_CACHE = '.npm' // Cache for npm
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git 'https://github.com/yourusername/PiFinance-Core.git' // Replace with your repository URL
            }
        }

        stage('Install Dependencies') {
            steps {
                // Use Node.js Docker image
                script {
                    docker.image("node:${NODE_VERSION}").inside {
                        sh 'npm install' // Install dependencies
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run unit tests
                script {
                    docker.image("node:${NODE_VERSION}").inside {
                        sh 'npm test' // Run tests
                    }
                }
            }
        }

        stage('Build') {
            steps {
                // Build the application
                script {
                    docker.image("node:${NODE_VERSION}").inside {
                        sh 'npm run build' // Build the application
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the application (this can vary based on your deployment strategy)
                script {
                    // Example: Deploy to a server or cloud service
                    sh 'ssh user@yourserver "cd /path/to/your/app && git pull && npm install && pm2 restart all"' // Replace with your deployment command
                }
            }
        }
    }

    post {
        success {
            // Notify on success
            echo 'Pipeline completed successfully!'
        }
        failure {
            // Notify on failure
            echo 'Pipeline failed!'
        }
    }
}
