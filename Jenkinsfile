pipeline {
    agent { docker {
        image "node:lts-alpine"
        args "-v /var/run/docker.sock:/var/run/docker.sock"
    }}
    stages {
        stage("Setup") {
            steps {
                sh "apk add docker-cli"
            }
        }
        stage('Test') { 
            steps {
                sh "npm install"
                sh "npm run test:unit:ci"
                sh "npm run test:api:ci"
            }
        }
    }
}
