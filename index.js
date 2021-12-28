class Index {
    constructor(){
        this.addEventListeners();
        this.song = { "song": new Song() }

        this.date = new Date();
        this.bigOldStartTime = this.date.getTime()

        this.audio = document.getElementById("myAudio");

        this.debugOnly();
    }

    debugOnly(){
        // setInterval(()=>{console.log(this.elapsedTime())}, 500)
        var audio = document.getElementById("myAudio");
        $( document ).click( (e) => {
            audio.play();

            setInterval(()=>{
                // console.log(audio.currentTime * 1000, this.elapsedTime())
            }, 500);
        });
    }


    addEventListeners(){
      $( document ).keydown( (e) => {
          this.onKeyDown(e)
      });

      $( '#download' ).click( (e) => {
        this.handleDownload(e)
        this.cancelPlay()
    });

    }

    cancelPlay(){
        var x = document.getElementById("myAudio");
        $( document ).click( (e) => {
            x.pause();
        });
    }

    onKeyDown(e){
        console.log(e)
        let keyStr = e.originalEvent.key;

        this.chartStart = this.chartStart || 10800;
        this.chartStart += 2400
        // let timeStamp = this.chartStart;//this.elapsedTime()+10800;
        // let timeStamp = this.elapsedTime();
        let timeStamp = this.audio.currentTime * 1000
        console.log(timeStamp)

        let newNote = note(keyStr, timeStamp);
        this.song.song.notes.push(newNote);
    }

    handleDownload(){
        let fileNamePrefix = 'tutorial-easy'
        console.log('down load');
        let storageObj = this.song;
        let text = JSON.stringify(storageObj, null, 2);
        var fileName = `${fileNamePrefix}.json`;

        const a = document.createElement('a');
        const type = fileName.split(".").pop();
        a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
        a.download = fileName;
        a.click();
    }

    elapsedTime(){
        let etValue = new Date().getTime() - this.bigOldStartTime;
        console.log(etValue);
        return etValue;
    }

}

let note=(keyString, timeStamp)=> {
    let sectionNoteKeyNumber = getKeyNumber(keyString); // may want to default to zero || 0;
    timeStamp = timeStamp || 0;
    sectionNote = [timeStamp,sectionNoteKeyNumber,0]
    // otherSectionNote = [timeStamp+1200,sectionNoteKeyNumber,0]

    return {"mustHitSection":true,"typeOfSection":0,"lengthInSteps":16,"sectionNotes":[ sectionNote ]}
    }



let songJson = function(){
    json = {
        "song": new Song()
    }


    return json;
}

let getKeyNumber =(keyNameStr)=> {
    let converterHash =  {'ArrowLeft':0, 'ArrowRight':3, 'ArrowUp':2, 'ArrowDown':1}
    keyValue = converterHash[keyNameStr]
    return keyValue;
}


