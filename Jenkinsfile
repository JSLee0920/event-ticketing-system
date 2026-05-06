pipeline {
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: maven
                image: maven:3.9.6-eclipse-temurin-21
                command:
                - cat
                tty: true
            '''
        }
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build & Run Tests') {
            steps {
                container('maven') {
                    echo 'Injecting secure PEM files and compiling code...'

                    // Fetch both files from the Jenkins vault simultaneously
                    withCredentials([
                        file(credentialsId: 'jwt-private-key', variable: 'JWT_PRIVATE_KEY'),
                        file(credentialsId: 'jwt-public-key', variable: 'JWT_PUBLIC_KEY')
                    ]) {

                        // Pass the temporary file paths to the Spring Boot Test environment
                        sh 'mvn clean package -D jwt.private-key=file:${JWT_PRIVATE_KEY} -D jwt.public-key=file:${JWT_PUBLIC_KEY}'
                    }
                }
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
                success {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }
    }
}