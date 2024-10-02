pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ItsMeAadityaK/JenkinsHD_6.2.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js and npm dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the React project
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // Run tests (e.g., Jest or any other test framework)
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy to a server or hosting (e.g., AWS S3, Netlify, etc.)
                echo 'Deploying the app...'
                // For example, you could use AWS CLI or any hosting provider’s CLI here.
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
