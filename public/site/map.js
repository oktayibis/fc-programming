
const getEl = (id) => document.getElementById(id);

const simpleNames = [
    {
        name: 'John',
        surname: 'Doe',
        age: 25,
    }, 
    {
        name: 'Jane',
        surname: 'Doe',
        age: 23,
    },
    {
        name: 'John',
        surname: 'Smith',
        age: 30,
    },
]

const getFullName = (person, index) => `${index+1}. ${person.name} ${person.surname}`;

const getAge = (person) => person.age;

const buildPerson = (person, index) => compose(
    append(text(getFullName(person, index))), 
    attr('data-index', index), 
    addClass('text-white'), 
    addClass('bg-dark'),
    addClass('mb-2'),
    addClass('p-3'))(createEl('div'));

const view = (state) => {
    const el = compose(addClass('container'), addClass('mb-4'))(createEl('div'));
    
    return state.map(buildPerson)
    .reduce(
        (acc, curr) => {
            append(curr)(el);
            return el;
        }, el
    )

}


const app = (state, output) => {
    compose(append(view(state)))(output)
}


app(Object.freeze([...simpleNames]), getEl('message-list'));

app(Object.freeze([...simpleNames].filter(person => person.age < 25)), getEl('filter'));

