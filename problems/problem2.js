{
  "title" : "Exercise 2 : Anagram count",
  "descriptions" : ["For this exercise, your task is to create a function, which when given an input word and a list of words will return a count of the number of words from the word list which are an anagram of the input word."],
  "languages" : [
    {
      "language" : "javascript",
      "initial" : "function anagramCount(word,words) {\n}\n",
      "after" : ["function validate(word,words,expected) {  var actual = anagramCount(word,words);  var ok = actual == expected;  if(!ok) { console.log('Expected '+expected+', but got '+actual); }  return ok }","function allok() { return validate('dog',['dog','cat','god'], 2) && validate('car',['ccc','a','asdf','rac'], 1) && validate('mouse',['rat','sausage'], 0)  }","allok()"]
    },
    {
      "language" : "python",
      "initial" : "def anagramCount(word, words):\n",
      "after" : ["def validate(word,words,expected):\n actual = anagramCount(word,words)\n ok = actual == expected\n if not ok:\n    print 'expected ' + str(expected) + ', but got ' + str(actual)\n return ok","def allok():\n return validate('dog',['dog','cat','god'], 2) and validate('car',['ccc','a','asdf','rac'], 1) and validate('mouse',['rat','sausage'], 0)","allok()"]
    },
    {
      "language" : "lua",
      "initial" : "function anagramCount(word,words)\nend",
      "after" : ["function validate(word,words,expected)\n actual = anagramCount(word,words)\n ok = actual == expected\nif ok ~= true then\nprint('expected ' .. expected .. ', but got ' .. actual)\nend\nreturn ok\nend","function allok()\nreturn validate('dog',{'dog','cat','god'}, 2) and validate('car',{'ccc','a','asdf','rac'}, 1) and validate('mouse',{'rat','sausage'}, 0)\nend","allok()"]
    },
    {
      "language" : "ruby",
      "initial" : "def anagramCount(word,words)\nend",
      "after" : ["def validate(word,words,expected)\nactual = anagramCount(word,words)\nok = actual == expected\nif (!ok) then\nprint 'expected ' + expected.to_s() + ', but got ' + actual.to_s()\nend\nreturn ok\nend","def allok()\nreturn validate('dog',['dog','cat','god'], 2) && validate('car',['ccc','a','asdf','rac'], 1) && validate('mouse',['rat','sausage'], 0)\nend","allok()"]
    },
    {
      "language" : "clojure",
      "initial" : "(defn anagram-count [word,words])",
      "after" : ["(defn validate [word words expected] (let [actual (anagram-count word words) ok (= expected actual)] (if-not ok (println \"expected \" expected \", but got \" actual)) ok))","(defn allok [] (and (validate \"dog\" [\"dog\" \"cat\" \"god\"] 2) (validate \"car\" [\"ccc\" \"a\" \"asdf\" \"rac\"] 1) (validate \"mouse\" [\"rat\" \"sausage\"] 0)))","(allok)"]
    }
  ]  
}