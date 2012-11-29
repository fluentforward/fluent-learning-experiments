function createRepl(language, config, cb) {
  var repl = new JSREPL(config)
  repl.loadLanguage(language, function() {
    cb(repl)
  })
}

function initProblem(Y, id,data, container) {
  var editorid = 'problem-editor-'+id
  var title = Y.Node.create('<h3>' + data.title + '</p>')
  var descriptions = Y.Node.create('<div></div>')  
  var inputBlock = Y.Node.create('<div style="height: 300px"></div>')
  var languagesBlock = Y.Node.create('<div></div>')
  var textArea = Y.Node.create('<div id="'+editorid+'" style="width: 550px; height: 250px"></div>')
  var runButton = Y.Node.create(' <center><input class="button runbutton" type="submit" value="Run"></input></center>')
  var resultsDiv = Y.Node.create('<div id="result" style="border: solid 1px;white-space: pre;width: 540px;padding: 5px;font-family: courier; font-size:11px;max-height:250px;overflow:scroll;">Exercise results</div>')
  var successDiv = Y.Node.create('<center><p>Congratulations! You just passed this exercise!</p></center>')
  var loader = Y.Node.create('<center><img src="ajax-loader.gif"></img></center>')
  var language = 0
  var sent = 0
  var returned = 0
  var editor

  loader.hide()
  resultsDiv.hide()
  successDiv.hide()

  for (var i=0; i < data.descriptions.length; i++) {
    descriptions.append(Y.Node.create('<p>' + data.descriptions[i] + '</p>'))
  }

  var addEventHandler = function(languageButton, i) {
    languageButton.on('click', function() {      
      selectLanguage(i)
    })
  }

  var selectLanguage = function(n) {
    language = n
    
    languagesBlock.get('childNodes').remove()

    for (var i=0; i < data.languages.length; i++) {
      var clazz = i == language ? 'fluent-learning-language-active' : 'fluent-learning-language-inactive'
      var languageButton = Y.Node.create('<div class="' + clazz + '">' + data.languages[i].language + '</div>')
      addEventHandler(languageButton,i)
      languagesBlock.append(languageButton)
    }

    if (data.languages[language].initial) {
      editor.setValue(data.languages[language].initial)
    }

    editor.getSession().setMode("ace/mode/"+data.languages[language].language);
  }   

  inputBlock.append(languagesBlock)
  inputBlock.append(textArea)

  var writeResult = function(x) {
    resultsDiv.append(Y.Node.create('<p>'+x+'</p>'))
    resultsDiv.show()
  }

  var onInput = function() { console.error('Unexpected request for input'); writeResult('ERROR: ' + x)}
  var onOutput = function(x) { console.log('output',x); writeResult('Output: '+x) }
  
  var enableRunning = function() {
    runButton.show()
    loader.hide()
  }

  var onResult = function(x) { 
    console.log('res',x)
    returned++
    if (returned == sent) {      
      if (x && x.toLowerCase() == "true") {        
        successDiv.show()
      } else {
        var resultNode = Y.Node.create('<p>Fail :-(</p>')
        resultsDiv.append(resultNode)
        resultsDiv.show()
      }
      enableRunning()
    }
  }
  
  var onScriptError = function(err) { 
    writeResult('ERROR: ' + err) 
    enableRunning()
  }

  var onTimeout = function() {
    writeResult('ERROR - script timeout')
    enableRunning()
  }  
  
  var runProblem = function() {
    runButton.hide()
    loader.show()
    sent = 0
    returned = 0
    resultsDiv.get('childNodes').remove()
    resultsDiv.hide()
    var script = editor.getValue()
    var config = {
      input: onInput,
      output: onOutput,
      result: onResult,
      error: onScriptError,
      timeout: {
        time: 30000,
        callback: onTimeout
      }
    }

    var execProblem = function(repl) {
      if (data.languages[language].before) {
        sent++
        repl.eval(data.languages[language].before)
      }
      sent++
      repl.eval(script)
      if (typeof(data.languages[language].after) == 'string') {
        sent++
        repl.eval(data.languages[language].after)
      } else {
        for (var i=0; i < data.languages[language].after.length; i++) {
          sent++
          repl.eval(data.languages[language].after[i])
        }
      }
    }
    createRepl(data.languages[language].language, config, execProblem)
    return false
  }    

  container.append(title).append(descriptions).append(inputBlock).append(runButton).append(loader).append(resultsDiv).append(successDiv)
  editor = ace.edit(editorid)
  editor.setTheme("ace/theme/monokai");

  runButton.on('click',runProblem)

  selectLanguage(0)
}

function loadProblem(id) {
  YUI().use('node','io','json-parse', function(Y) {
    var problemContainer = Y.one('#problem'+id)
    
    Y.io('problems/problem'+id+'.js', {
      on: {
        success: function(x,o) {
          try {
            data = Y.JSON.parse(o.responseText)            
            initProblem(Y,id,data,problemContainer)
          } catch  (e) {
            console.error(e)
          }
        }
      }
    })    
  })
}