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
                // Get stage information through the API (no special methods)
                def buildUrl = "${env.JENKINS_URL}${env.BUILD_URL}api/json"
                def buildData = new groovy.json.JsonSlurper().parse(new URL(buildUrl))
                
                // Create stage report
                def stageReport = buildData.stages.collect { stage ->
                    "${stage.name}: ${stage.status}"
                }.join('\n')
                
                emailext(
                    to:EMAIL_RECIPIENTS ,
                    subject: "Pipeline Status: ${currentBuild.currentResult}",
                    body: """
                    <h2>Pipeline Report</h2>
                    <p><b>Overall Status:</b> ${currentBuild.currentResult}</p>
                    <h3>Stage Results:</h3>
                    <pre>${stageReport}</pre>
                    <p><a href="${env.BUILD_URL}">View Full Build</a></p>
                    """,
                    mimeType: 'text/html'
                )
         cleanWs()
         }
      }
   }
}
