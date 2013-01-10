function createRepl(language, config, cb) {
  var repl = new JSREPL(config)
  repl.loadLanguage(language, false, function() {
    cb(repl)
  })
}

function initProblem(base,Y, id,sharelink,data, container) {
  var editorid = 'problem-editor-'+id
  var title = Y.Node.create('<h3>' + data.title + '</p>')
  var descriptions = Y.Node.create('<div></div>')  
  var inputBlock = Y.Node.create('<div style="height:300px"></div>')
  var languagesBlock = Y.Node.create('<div></div>')
  var textArea = Y.Node.create('<div id="'+editorid+'" style="width: 550px; height: 250px"></div>')
  var runButton = Y.Node.create(' <div class="fluent-learning-center"><input class="button runbutton" type="submit" value="Run Code!"></input></div>')
  var resultsDiv = Y.Node.create('<div id="result" style="border: solid 1px;white-space: pre;width: 540px;padding: 5px;font-family: courier; font-size:11px;max-height:250px;overflow:scroll;">Exercise results</div>')
  var successDiv = Y.Node.create('<div class="fluent-learning-center"><p>Congratulations! You just passed this exercise! Why not share your solution : <a id=sharesolution></a></p></div>')
  var loader = Y.Node.create('<div class="fluent-learning-center"><img src="'+base+'ajax-loader.gif"></img></div>')
  var language = 0
  var sent = 0
  var returned = 0
  var editor
  var lastEditValues = {}

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
    if (language != undefined)
      lastEditValues[language] = editor.getValue()

    language = n
    
    languagesBlock.get('childNodes').remove()

    for (var i=0; i < data.languages.length; i++) {
      var clazz = i == language ? 'fluent-learning-language-active' : 'fluent-learning-language-inactive'
      var languageButton = Y.Node.create('<div class="' + clazz + '">' + data.languages[i].language + '</div>')
      addEventHandler(languageButton,i)
      languagesBlock.append(languageButton)
    }

    var initial = lastEditValues[language] || data.languages[language].initial
    if (initial) {
      editor.setValue(initial)
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
    returned++
    if (returned == sent) {      
      if (x && x.toLowerCase() == "true") {        
        var shareLink = successDiv.one('#sharesolution')
        addthis.button(shareLink._node, {
          templates: {
            twitter: 'Check out my ' + data.languages[language].language + ' solution to ' + data.title + ' - {{url}} (from @fluent_learning)'
          }
        }, {
          title: 'Checkout my ' + data.languages[language].language + ' solution to ' + data.title,
          url: sharelink + '?solutionLanguage=' + data.languages[language].language + '&solution=' + encodeURIComponent(editor.getValue())
        })
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
    successDiv.hide()
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
      
      var cmds = script.split('\n\n')
      for (var i=0; i < cmds.length; i++) {
        sent++
        repl.eval(cmds[i])
      }

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

  var getParameterByName = function(name)
  {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  , solutionLanguage = getParameterByName('solutionLanguage')
  , solution = getParameterByName('solution')

  if (solution != undefined && solutionLanguage != undefined) {
    var targetLanguage
    for (var i=0; i < data.languages.length && targetLanguage == undefined; i++) {
      if (data.languages[i].language == solutionLanguage) {
        targetLanguage = i
      }
    }
    selectLanguage(targetLanguage)
    editor.setValue(solution)
  } else {
    selectLanguage(0)    
  }

}

function loadProblem(base,sharelink,id) {
  YUI().use('node','io','json-parse', function(Y) {
    var problemContainer = Y.one('#problem'+id)
    
    Y.io(base+'problems/problem'+id+'.js', {
      on: {
        success: function(x,o) {
          try {
            data = Y.JSON.parse(o.responseText)            
            initProblem(base,Y,id,sharelink,data,problemContainer)
          } catch  (e) {
            console.error(e)
          }
        }
      }
    })    
  })
}