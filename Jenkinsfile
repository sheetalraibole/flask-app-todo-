pipeline{
   agent any
   environment{
      EMAIL_RECIPIENTS = 'syedabrarali346@gmail.com'
   }
 // Track stage statuses manually
    def stageResults = [:]

    stages {
        stage('Validate') {
            steps {
                script {
                    try {
                        echo "🔍 Validating environment..."
                        // Add your validation checks here
                        validateParameters()
                        checkDependencies()
                        stageResults['Validate'] = 'SUCCESS ✅'
                        echo "Validation passed"
                    } catch (Exception e) {
                        stageResults['Validate'] = 'FAILED ❌'
                        error("Validation failed: ${e.message}")
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    try {
                        echo "🏗️ Building application..."
                        // Your build commands here
                        //sh 'mvn clean package'
                        stageResults['Build'] = 'SUCCESS ✅'
                        echo "Build successful"
                    } catch (Exception e) {
                        stageResults['Build'] = 'FAILED ❌'
                        error("Build failed: ${e.message}")
                    }
                }
            }
        }

        stage('Test') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                script {
                    try {
                        echo "🧪 Running tests..."
                        // Your test commands here
                        //sh 'mvn test'
                        stageResults['Test'] = 'SUCCESS ✅'
                        echo "Tests passed"
                    } catch (Exception e) {
                        stageResults['Test'] = 'UNSTABLE ⚠️'
                        unstable("Tests failed: ${e.message}")
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                script {
                    try {
                        echo "🚀 Deploying application..."
                        // Your deploy commands here
                        //sh './deploy.sh'
                        stageResults['Deploy'] = 'SUCCESS ✅'
                        echo "Deployment complete"
                    } catch (Exception e) {
                        stageResults['Deploy'] = 'FAILED ❌'
                        error("Deployment failed: ${e.message}")
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Generate detailed report without API access
                def report = generateReport(stageResults)
                
                // Archive and send report
                writeFile file: 'deployment_report.txt', text: report
                archiveArtifacts artifacts: 'deployment_report.txt'
                
                emailext(
                    subject: "DEPLOYMENT REPORT: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                    body: report,
                    to: 'syedsyedsyed10001@gmail.com',
                    mimeType: 'text/plain'
                )
                
                // Console summary
                echo "=== FINAL STATUS ==="
                echo report
            }
        }
    }
}

// Custom functions
def validateParameters() {
    if (!params.RELEASE_VERSION) {
        error("RELEASE_VERSION parameter is required")
    }
    // Add more validations as needed
}

def checkDependencies() {
    // Example: Check Java exists
    def javaCheck = sh(script: 'java -version', returnStatus: true)
    if (javaCheck != 0) {
        error("Java runtime not found")
    }
    // Add more dependency checks
}

def generateReport(stageResults) {
    def report = """
    ╔══════════════════════════════════════╗
    ║        DEPLOYMENT EXECUTION REPORT   ║
    ╠══════════════════════════════════════╣
    ║ Job: ${env.JOB_NAME.padRight(25)} ║
    ║ Build: #${env.BUILD_NUMBER.padRight(20)} ║
    ║ Status: ${currentBuild.currentResult.padRight(19)} ║
    ║ Duration: ${currentBuild.durationString.padRight(16)} ║
    ╚══════════════════════════════════════╝
    
    STAGE RESULTS:
    """
    
    stageResults.each { stage, status ->
        report += "    ${stage.padRight(10)}: ${status}\n"
    }
    
    report += """
    
    ADDITIONAL DETAILS:
    - Workspace: ${env.WORKSPACE}
    - Node: ${env.NODE_NAME}
    - Build URL: ${env.BUILD_URL}
    """
    
    return report
}
