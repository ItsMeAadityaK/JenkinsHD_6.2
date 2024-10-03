pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = 'nfp_v1ZFAE8wo8ab7XDha8jCg7gwNWsXePeE4046' // Netlify Access Token
        SITE_ID = '873bd20a-3bba-414d-b418-d9823f50875f' // Netlify Site ID
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ItsMeAadityaK/JenkinsHD_6.2.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install' // Install Node.js and npm dependencies
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build' // Build the React project
            }
        }

        stage('Test') {
            steps {
                bat 'start /b npm start' // Start the app in the background
                sleep(time: 10, unit: 'SECONDS') // Wait for the app to be up
                bat 'node Selenium.test.js' // Run Selenium tests
            }
        }

        stage('Release to Netlify') {
            steps {
                script {
                    echo 'Deploying to Netlify...'
                    bat 'npm run build' // Ensure the build directory is fresh
                    bat 'netlify deploy --dir=./build --prod --auth=%NETLIFY_AUTH_TOKEN% --site=%SITE_ID%' // Use global Netlify CLI
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'App deployment completed.'
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
