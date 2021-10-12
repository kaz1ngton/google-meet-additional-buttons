if (!buttonsMenu) {   
    var buttonsMenu = document.querySelector('.cZG6je');
}

if (buttonsMenu && (!document.querySelector('.add-button'))) {
    const noop = () => {};

    // function which creates and add no meny button
    const createButton = ({ styleList = {}, content, classes = '', func = noop }) => {
        const button = document.createElement('button');

        button.innerText = content;

        for (const style in styleList) {
            button.style[style] = styleList[style];
        }

        button.classList = classes + ' add-button';

        func(button);

        buttonsMenu.insertBefore(button, document.querySelector('.xEp89c'));
    };

    // creating MUTE / UNMUTE buttons
    createButton({
        classes: 'mute-button',
        content: 'MUTE',
        func: (button) => {
            button.addEventListener('click', (e) => {
                const currentButton = e.currentTarget;

                if (currentButton.classList.contains('muted')) {
                    button.innerText = 'MUTE';
                    document
                        .querySelectorAll('video, audio')
                        .forEach((elem) => (elem.muted = false));
                } else {
                    button.innerText = 'UNMUTE';
                    document
                        .querySelectorAll('video, audio')
                        .forEach((elem) => (elem.muted = true));
                }
                currentButton.classList.toggle('muted');
            });
        },
    });

    // creating Volume down button
    createButton({
        content: '-',
        classes: 'volume-button',
        func: (button) => {
            button.addEventListener('click', () => {
                document
                    .querySelectorAll('video, audio')
                    .forEach((elem) => (elem.volume = elem.volume - 0.1));
            });
        },
    });

    // creating Volume up button
    createButton({
        content: '+',
        classes: 'volume-button',
        func: (button) => {
            button.addEventListener('click', () => {
                document
                    .querySelectorAll('video, audio')
                    .forEach((elem) => (elem.volume = elem.volume + 0.1));
            });
        },
    });
}
