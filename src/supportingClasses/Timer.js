class Timer{
    constructor(duration){
        this.start = 0;
        this.time = 0;
        this.duration = 0;
        this.end = false;
    }

    init(duration){
        if(duration) this.duration = Date.now() + duration * 1000;
        this.start = this.time = Date.now();
    }

    tick(){
        this.time = Date.now();
        if(this.duration && this.time >= this.duration) this.end = true;
        return (this.time - this.start)/1000;
    }

    check(){
        if(this.end){
            return true;
        }
        return false;
    }

    clear(){
        this.start = 0;
        this.time = 0;
        this.duration = 0;
        this.end = false;
    }
}
export {Timer};
