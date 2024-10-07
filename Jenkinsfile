pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = 'nfp_v1ZFAE8wo8ab7XDha8jCg7gwNWsXePeE4046' // Netlify Access Token
        SITE_ID = '873bd20a-3bba-414d-b418-d9823f50875f' // Netlify Site ID
        DOCKER_IMAGE = 'react-app:latest' // Docker image
        SONAR_PROJECT_KEY = 'sqp_08c6375330de8586cca9c93763da4b59370fc489' // SonarQube project key
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

        stage('Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('Local SonarQube') {
                        // This runs the SonarQube scanner
                        bat 'sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=./src -Dsonar.host.url=http://localhost:9000 -Dsonar.login=${SONAR_TOKEN}'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t react-app:latest .' // Build the Docker image
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
                    bat 'C:\\Users\\aadig\\AppData\\Roaming\\npm\\netlify deploy --dir=./build --prod --auth=%NETLIFY_AUTH_TOKEN% --site=%SITE_ID%'
                }
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                script {
                    echo 'Deploying the application to a Docker container...'
                    bat '''
                        docker-compose down
                        docker-compose up -d --build
                    '''
                }
            }
        }

        stage('Datadog Monitoring and Alerting') {
            steps {
                script {
                    echo 'Sending custom deployment event to Datadog...'
                    withCredentials([string(credentialsId: 'datadog_api_key', variable: 'DATADOG_API_KEY')]) {
                        bat """
                        curl -X POST -H "Content-type: application/json" -d "{\\"title\\": \\"Deployment completed for ${DOCKER_IMAGE}\\", \\"text\\": \\"Deployment done at %DATE% %TIME%\\", \\"priority\\": \\"normal\\", \\"tags\\": [\\"environment:production\\", \\"project:jenkinshd\\"], \\"alert_type\\": \\"info\\"}" "https://api.datadoghq.com/api/v1/events?api_key=%DATADOG_API_KEY%"
                        """
                    }
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
