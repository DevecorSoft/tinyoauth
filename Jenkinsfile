pipeline {
    agent { docker "node:lts-alpine"}
    stages {
        stage('Test') { 
            steps {
                sh "npm install"
            }
        }
    }
}
