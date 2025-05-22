pipeline{
   agent any
   environment{
      EMAIL_RECIPIENTS = 'syedabrarali346@gmail.com'
   }
   stages{
     stage("build"){
       steps {
           echo "sucess"  
         }
     }
     stage("test"){
       steps {
          echo "test"
         }
     }
     stage("artifacts"){
       steps {
          echo "ecr"
         }
     }
     stage("deploy"){
       steps {
         echo "deploy"
         }
     }
   }
   post{
      always{
         script {
                // PROPER way to construct the API URL
                def buildApiUrl = "${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/api/json"
                
                try {
                    // Get build data through the API
                    def buildData = new groovy.json.JsonSlurper().parse(new URL(buildApiUrl))
                    
                    // Create email content
                    def emailContent = """
                    <h2>Deployment Report</h2>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build #:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Duration:</b> ${buildData.duration ? (buildData.duration/1000) + ' seconds' : 'N/A'}</p>
                    <p><a href="${env.BUILD_URL}">View Build</a></p>
                    """
                    
                    // Send email
                    emailext(
                        to: EMAIL_RECIPIENTS,
                        subject: "Deployment Status: ${currentBuild.currentResult}",
                        body: emailContent,
                        mimeType: 'text/html'
                    )
                } catch (Exception e) {
                    echo "Failed to send email report: ${e.getMessage()}"
                    echo "Using fallback method..."
                    
                    // Fallback simple email without API data
                    emailext(
                        to: EMAIL_RECIPIENTS,
                        subject: "Deployment Status: ${currentBuild.currentResult}",
                        body: """
                        Basic Deployment Report
                        Job: ${env.JOB_NAME}
                        Build #: ${env.BUILD_NUMBER}
                        Status: ${currentBuild.currentResult}
                        URL: ${env.BUILD_URL}
                        """
                    )
                }
                   cleanWs()
                }
      }
   }
}
