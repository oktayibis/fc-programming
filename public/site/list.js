
const getEl = (id) => document.getElementById(id);


const on = curry((event, element, fn) => {
    element.addEventListener(event, fn);
    return function() {
        element.removeEventListener(event, fn);
    }
});

const view = state => {
    const appendFunc = state.map((content, index)=> append(addMessage(content, index)))

    return state.length > 0 ? pipe(
        ...appendFunc,
    )(createEl('div')) : text('No messages');
}

const clear = curry((element) => {
    element.innerHTML = '';
    return element;
});

const clearText  = (element) => {
    element.value = '';
    return element;
}


   
const addMessage = (content, index) => compose(
    append(text(content)),
    attr('data-index', index),
    addClass('alert'),
    addClass('alert-success'),
)(createEl('div'));

const buttonClick = on('click', getEl('message-button'))



function app(state, output, dispatch) {

  compose(append(view(state)), clear())(output)

   const stop = dispatch(e => {
    stop()
    const text = getEl('message-text')
    const message = text.value;
    const newState = [...state, message];
    clearText(text);

    app(newState, output, dispatch);
   })

}

app(Object.freeze([]), getEl('message-list'), buttonClick);
