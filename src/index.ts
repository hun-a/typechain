interface Human {
  name: string;
  age: number;
  gender: String;
};

const person: Human = {
  name: 'huna',
  age: 33,
  gender: 'male'
};

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, your are ${person.age}, you are a ${person.gender}`;
};

console.log(sayHi(person));
