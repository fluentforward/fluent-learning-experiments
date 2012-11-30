{
  "title" : "Exercise 1 : FizzBuzz",
  "descriptions" : ["For this first exercise, I've gone with the traditional FizzBuzz exercise."," The task is to create a function fizzbuzz, that when given a number will return 'fizz' if the number is divisible by 3, 'buzz' if the number is divisiable by 5, 'fizzbuzz' if the number is divisible by 3 and 5, and otherwise will return the original number."],
  "languages" : [
    {
      "language" : "javascript",
      "initial" : "function fizzbuzz(n)\n{\n}",
      "after" : ["function solution(n) { var res=fizzbuzz(n); if (n % 3 == 0 && n % 5 == 0) return 'fizzbuzz'; if (n % 3 == 0) return 'fizz'; if (n % 5 == 0) return 'buzz'; return n; };function allok() {var ok = true; for (var i=0; i < 100; i++) { if (fizzbuzz(i) != solution(i)) { console.log('Fail: expected '+solution(i)+' but got '+fizzbuzz(i)+' for '+i) }; ok = ok && solution(i) == fizzbuzz(i); }; return ok;};","allok()"]
    },
    {
      "language" : "python",
      "initial" : "def fizzbuzz(n):",
      "after" : ["def solution(n):\n if n % 3 == 0 and n % 5 == 0:\n  return 'fizzbuzz'\n if n % 3 == 0:\n  return 'fizz'\n if n % 5 == 0:\n   return 'buzz'\n return n","def allok():\n n = 0\n ok = True\n while n < 101:\n  if fizzbuzz(n) != solution(n):\n   print 'Fail: expected ' + str(solution(n)) + ' but got ' + str(fizzbuzz(n)) + ' for ' + str(n)\n  ok = ok and fizzbuzz(n) == solution(n)\n  n = n + 1\n return ok\n","allok()"]
    },
    {
      "language" : "lua",
      "initial" : "function fizzbuzz(n)\nend",
      "after" : ["function solution(n)\nf = n % 3 == 0\nb = n % 5 == 0\nif f and b then\nreturn 'fizzbuzz'\nelseif f then\nreturn 'fizz'\nelseif b then\nreturn 'buzz'\nelse\nreturn n\nend\nend","function allok()\nok = true\nfor i=1,100 do\nif fizzbuzz(i) ~= solution(i) then\nprint('Fail: expected '..solution(i)..' but got '..fizzbuzz(i)..' for '..i)\nend\nok = ok and fizzbuzz(i)==solution(i)\nend\nreturn ok\nend","allok()"]
    },
    {
      "language" : "ruby",
      "initial" : "def fizzbuzz(n)\nend",
      "after" : ["def solution(n)\nif n % 5 == 0 && n % 3 == 0 then return 'fizzbuzz'\nelsif n % 5 == 0 then return 'buzz'\nelsif n % 3 == 0 then return 'fizz'\nelse return n\nend\nend","def allok()\nok = true\n1.upto(100) do |i|\nif fizzbuzz(i) != solution(i) then\nprint 'Fail: expected '+solution(i).to_s()+' but got '+fizzbuzz(i).to_s()+' for '+i.to_s()\nend\nok = ok && fizzbuzz(i)==solution(i)\nend\nreturn ok\nend","allok()"]
    },
    {
      "language" : "clojure",
      "initial" : "(defn fizzbuzz [n])",
      "after" : ["(defn solution [n] (if (zero? (mod n 5)) (if (zero? (mod n 3)) \"fizzbuzz\" \"buzz\") (if (zero? (mod n 3)) \"fizz\" n)))","(defn allok [] (loop [ok true i 0] (if (= 101 i) ok (let [s (solution i) f (fizzbuzz i)] (if (= s f) (recur ok (inc i)) (do (println \"Fail: Expected \" s \"  but got \" f \" for \" i) (recur false (inc i))))))))","(allok)"]
    }
  ]  
}