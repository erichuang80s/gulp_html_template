(function() {
    // css -> main.css
    class Loading {
        constructor(args) {
            const def = {
                root: document.body,
                text: '',
                color: 'primary',
                backgroundColor: 'rgba(255,255,255,.75)',
                zIndex: 1050
            }
            this.overlayEl = null
            Object.assign(def, args)
            Object.assign(this, def)

            this.init()
        }

        init() {
            this.overlayEl = document.createElement('div')
            this.overlayEl.style.position = 'absolute'
            this.overlayEl.style.inset = 0
            this.overlayEl.style.zIndex = this.zIndex
            this.overlayEl.style.backgroundColor = this.backgroundColor
            this.hide()

            const container = document.createElement('div')
            container.style.position = 'absolute'
            container.style.top = '50%'
            container.style.left = '50%'
            container.style.transform = 'translate(-50%)'
            container.style.textAlign = 'center'

            const spinner = document.createElement('div')
            spinner.classList.add('spinner-border', `text-${this.color}`)

            container.appendChild(spinner)
            if(this.text) {
                const textNode = document.createElement('div')
                textNode.classList.add('mx-auto')
                textNode.textContent = this.text
                container.appendChild(textNode)
            }
            this.overlayEl.appendChild(container)
            this.root.appendChild(this.overlayEl)
        }
        show() {
            this.overlayEl.style.display = 'initial'
        }
        hide() {
            this.overlayEl.style.display = 'none'
        }
    }
    if(window.bootstrap) {
        window.bootstrap.Loading = Loading
    } else {
        window.bootstrap = {
            Loading
        }
    }
})()