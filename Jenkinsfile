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
                // Get stage statuses (alternative method)
                def stageStatuses = []
                currentBuild.rawBuild.getStages().each { stage ->
                    stageStatuses << "${stage.name}: ${stage.status}"
                }
                
                emailext (
                    subject: "Pipeline Status: ${currentBuild.currentResult}",
                    body: """
                    <h2>Pipeline Report</h2>
                    <p><b>Overall Status:</b> ${currentBuild.currentResult}</p>
                    <h3>Stage Results:</h3>
                    <ul>
                        ${stageStatuses.collect { "<li>${it}</li>" }.join('\n')}
                    </ul>
                    """,
                    to:EMAIL_RECIPIENTS ,
                    mimeType: 'text/html'
                )
         cleanWs()
         }
      }
   }
}
