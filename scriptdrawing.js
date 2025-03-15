var lines = []
var penColor
var bgColor
var penWidth
var clearBut

function setup() {
    createCanvas(400, 450);

    var options = createDiv().style('display: flex')

    var optionsTitles = createDiv().parent(options)
    createP('Pen Color').parent(optionsTitles)
    createP('Background Color').parent(optionsTitles)
    createP('Pen Width').parent(optionsTitles)

    var optionsValues = createDiv().parent(options).style('margin: 10px 40px; width: 50px')
    penColor = createColorPicker('ffffff').parent(optionsValues)
    bgColor = createColorPicker('#lelele').parent(optionsValues).style('margin-top: 10px')
    penWidth = createSelect(false).parent(optionsValues).style('margin-top: 10px')
    penWidth.option('1')
    penWidth.option('2')
    penWidth.option('4')
    penWidth.option('8')
    penWidth.selected('2')

    clearBut = createButton('Clear').parent(options).style('width: 100px')
}

function draw() {
    background(bgColor.value())

    clearBut.mousePressed(function() {
        lines = []
    })

    if (mouseIsPressed) {
        var line = new MyLine(penColor.value(),penWidth.value())
        lines.push(line)
    }

    for (var line of lines) {
        line.show()
    }
}