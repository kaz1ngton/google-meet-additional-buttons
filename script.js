let volume = 1;
let buttonsMenu;

const findButtonsMenu = () => {
    document.querySelectorAll('i').forEach((el) => {
        if (el.textContent !== 'call_end') return;

        buttonsMenu = el.parentElement.parentElement.parentElement.parentElement;
    });
};

if (!buttonsMenu) {
    findButtonsMenu();
}

if (buttonsMenu && !document.querySelector('.add-button')) {
    buttonsMenu.style.display = 'flex';
    buttonsMenu.style.justifyContent = 'space-between';

    const noop = () => {};

    // function which creates and add no menu button
    const createButton = ({ styleList = {}, content, classes = '', func = noop }) => {
        const button = document.createElement('button');

        button.innerText = content;

        for (const style in styleList) {
            button.style[style] = styleList[style];
        }

        button.classList = classes + ' add-button';

        func(button);

        const buttons = buttonsMenu.children;
        buttons[1].insertAdjacentElement('afterend', button);
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
                    document.querySelectorAll('video, audio').forEach((elem) => (elem.muted = false));
                } else {
                    button.innerText = 'UNMUTE';
                    document.querySelectorAll('video, audio').forEach((elem) => (elem.muted = true));
                }
                currentButton.classList.toggle('muted');
            });
        },
    });

    // creating Volume DOWN button
    createButton({
        content: '-',
        classes: 'volume-button',
        func: (button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('video, audio').forEach((elem) => {
                    const updVol = Math.round((elem.volume - 0.1) * 10) / 10;
                    const vol = Math.max(0, updVol);
                    elem.volume = vol;
                    volume = vol;
                });
            });
        },
    });

    // creating Volume UP button
    createButton({
        content: '+',
        classes: 'volume-button',
        func: (button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('video, audio').forEach((elem) => {
                    const updVol = Math.round((elem.volume + 0.1) * 10) / 10;
                    const vol = Math.min(1, updVol);
                    elem.volume = vol;
                    volume = vol;
                });
            });
        },
    });

    setInterval(() => {
        document.querySelectorAll('video, audio').forEach((elem) => (elem.volume = volume));
    }, 100);
}
