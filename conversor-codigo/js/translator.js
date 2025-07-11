$(document).ready(function () {
  $("#translateButton").click(translate);
  $("#btnClear").click(clearPrefix);
  $("#btnReplace").click(replaceAll);
  $("#btn-generate").click(setPropertiesUsingArrayLikeFOX);
  $("#btn-clear-prop").click(clearProps);
  $("#whiteboard").hide();
});

function translate() {
  try {
    normalizeInput();

    let sourceText = $.trim($("#sourceText").val());
    let sourceLanguage = parseInt($("#selectSourceLanguage").val());
    let targetLanguage = parseInt($("#selectTargetLanguage").val());

    let translatedContent = "";

    if (sourceText.length == 0) {
      return;
    }

    if (sourceLanguage == 3) {
      translatedContent = normalizeFoxInput(sourceText);
      $("#selectSourceLanguage").val(1);
      return;
    } else {
      const linesArray = sourceText.split("\n");

      linesArray.forEach(function (line) {
        const processedLine = line.split(" ");

        if (sourceLanguage == 1) {
          switch (targetLanguage) {
            case 1:
              translatedContent += fox_to_csharp_prop(processedLine);
              break;
            case 2:
              translatedContent += fox_to_csharp_datacolumn(processedLine);
              break;
            case 3:
              translatedContent += fox_to_csharp_datarow(processedLine);
              break;
            default:
              translatedContent =
                "Operação não disponível. Contate o time de desenvolvimento.";
              break;
          }
        }

        if (sourceLanguage == 2) {
          switch (targetLanguage) {
            case 2:
              translatedContent += csharp_prop_to_datacolumn(processedLine);
              break;
            case 3:
              translatedContent += csharp_prop_to_datarow(processedLine);
              break;
            case 4:
              translatedContent += csharp_to_js_prop(processedLine);
              break;
            case 5:
              translatedContent += csharp_to_js_init(processedLine);
              break;
            case 6:
              translatedContent += csharp_ctor_clone(processedLine);
              break;
            case 7:
              translatedContent += csharp_ctor_string(processedLine);
              break;
            case 8:
              translatedContent += csharp_to_typescript_model(processedLine);
              break;
            default:
              translatedContent =
                "Operação não disponível. Contate o time de desenvolvimento.";
              break;
          }
        }

        if (sourceLanguage == 4) {
          switch (targetLanguage) {
            case 1:
              translatedContent +=
                typescript_model_to_csharp_prop(processedLine);
              break;
            case 9:
              translatedContent += typescript_contructor(processedLine);
              break;
            default:
              translatedContent =
                "Operação não disponível. Contate o time de desenvolvimento.";
              break;
          }
        }
      });
    }

    $("#targetText").val(translatedContent);
  } catch (e) {
    console.log(e);
  }
}

function fox_to_csharp_prop(CurrentLine) {
  try {
    if (CurrentLine[1] === "n") {
      return "public decimal " + CurrentLine[0] + " { get; set; }" + "\n";
    } else if (CurrentLine[1] === "c") {
      return "public string " + CurrentLine[0] + " { get; set; }" + "\n";
    } else if (CurrentLine[1] === "d") {
      return "public string " + CurrentLine[0] + " { get; set; }" + "\n";
    } else if (CurrentLine[1] === "l") {
      return "public bool " + CurrentLine[0] + " { get; set; }" + "\n";
    } else if (CurrentLine[1] === "m") {
      return "public string " + CurrentLine[0] + " { get; set; }" + "\n";
    }
  } catch (e) {
    console.log(e);
  }
}

function fox_to_csharp_datacolumn(CurrentLine) {
  try {
    if (CurrentLine[1] === "n") {
      return (
        'myDT.Columns.Add(new DataColumn("' +
        CurrentLine[0] +
        '", typeof(decimal)));' +
        "\n"
      );
    } else if (CurrentLine[1] === "c") {
      return (
        'myDT.Columns.Add(new DataColumn("' +
        CurrentLine[0] +
        '", typeof(string)));' +
        "\n"
      );
    } else if (CurrentLine[1] === "d") {
      return (
        'myDT.Columns.Add(new DataColumn("' +
        CurrentLine[0] +
        '", typeof(string)));' +
        "\n"
      );
    } else if (CurrentLine[1] === "l") {
      return (
        'myDT.Columns.Add(new DataColumn("' +
        CurrentLine[0] +
        '", typeof(bool)));' +
        "\n"
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function fox_to_csharp_datarow(CurrentLine) {
  try {
    return 'myRow["' + CurrentLine[0] + '"] = myObj.' + CurrentLine[0] + ";\n";
  } catch (e) {
    console.log(e);
  }
}

function csharp_to_js_prop(CurrentLine) {
  try {
    let identifier = "myObj.";

    if (CurrentLine[1] === "string") {
      return identifier + CurrentLine[2] + " : ''," + "\n";
    } else if (CurrentLine[1] === "decimal") {
      return identifier + CurrentLine[2] + " : 0," + "\n";
    } else if (CurrentLine[1] === "float") {
      return identifier + CurrentLine[2] + " : 0," + "\n";
    } else if (CurrentLine[1] === "int") {
      return identifier + CurrentLine[2] + " : 0," + "\n";
    } else if (CurrentLine[1] === "DateTime") {
      return identifier + CurrentLine[2] + " : ''," + "\n";
    } else if (CurrentLine[1] === "bool") {
      return identifier + CurrentLine[2] + " : false," + "\n";
    } else {
      return identifier + CurrentLine[2] + " : []," + "\n";
    }
  } catch (e) {
    console.log(e);
  }
}

function csharp_to_js_init(CurrentLine) {
  try {
    let identifier = "myObj.";

    if (CurrentLine[1] === "string") {
      return identifier + CurrentLine[2] + " = '';" + "\n";
    } else if (CurrentLine[1] === "decimal") {
      return identifier + CurrentLine[2] + " = 0;" + "\n";
    } else if (CurrentLine[1] === "float") {
      return identifier + CurrentLine[2] + " = 0;" + "\n";
    } else if (CurrentLine[1] === "int") {
      return identifier + CurrentLine[2] + " = 0;" + "\n";
    } else if (CurrentLine[1] === "DateTime") {
      return identifier + CurrentLine[2] + " = '';" + "\n";
    } else if (CurrentLine[1] === "bool") {
      return identifier + CurrentLine[2] + " = false;" + "\n";
    } else {
      return identifier + CurrentLine[2] + " = [];" + "\n";
    }
  } catch (e) {
    console.log(e);
  }
}

function csharp_prop_to_datacolumn(CurrentLine) {
  try {
    return (
      'myDT.Columns.Add(new DataColumn("' +
      CurrentLine[0] +
      '", typeof(' +
      CurrentLine[1] +
      ")));" +
      "\n"
    );
  } catch (e) {
    console.log(e);
  }
}

function csharp_prop_to_datarow(CurrentLine) {
  try {
    return 'myRow["' + CurrentLine[2] + '"] = myObj.' + CurrentLine[2] + ";\n";
  } catch (e) {
    console.log(e);
  }
}

function csharp_ctor_clone(CurrentLine) {
  try {
    let identifier = "myObj.";

    return CurrentLine[2] + " = " + identifier + CurrentLine[2] + ";\n";
  } catch (e) {
    console.log(e);
  }
}

function csharp_ctor_string(CurrentLine) {
  try {
    if (CurrentLine[1] === "string") {
      return CurrentLine[2] + ' = "";' + "\n";
    } else {
      return "";
    }
  } catch (e) {
    console.log(e);
  }
}

function typescript_model_to_csharp_prop(CurrentLine) {
  try {
    CurrentLine[1] = CurrentLine[1].replace(":", "");
    CurrentLine[2] = CurrentLine[2].replace(";", "");

    switch (CurrentLine[2]) {
      case "number":
        return (
          CurrentLine[0] + " decimal " + CurrentLine[1] + " { get; set; }\n"
        );
      case "string":
        return (
          CurrentLine[0] + " string " + CurrentLine[1] + " { get; set; }\n"
        );
      case "boolean":
        return CurrentLine[0] + " bool " + CurrentLine[1] + " { get; set; }\n";
    }
  } catch (error) {
    console.log(error);
  }
}

function csharp_to_typescript_model(CurrentLine) {
  try {
    switch (CurrentLine[1]) {
      case "decimal":
        return CurrentLine[0] + " " + CurrentLine[2] + ": number;\n";
      case "string":
        return CurrentLine[0] + " " + CurrentLine[2] + ": string;\n";
      case "bool":
        return CurrentLine[0] + " " + CurrentLine[2] + ": boolean;\n";
    }

    if(CurrentLine[1].includes("List")){
      let arrowLessProperty = CurrentLine[1].replace(/[<>]/g, " ");
      let splittedProperty = arrowLessProperty.split(" ");
      return CurrentLine[0] + " " + CurrentLine[2]  + ": Array<" + splittedProperty[1] + ">;\n";
    }
  } catch (error) {
    console.log(error);
  }
}

function typescript_contructor(CurrentLine) {
  try {
    let propName = CurrentLine[1].replace(":", "");
    let propType = CurrentLine[2].replace(";", "");

    switch (propType) {
      case "number":
        return "this." + propName + " = 0;\n";
      case "string":
        return "this." + propName + ' = "";\n';
      case "boolean":
        return "this." + propName + " = false;\n";
    }

    if(propType.includes("Array")){
      let arrowLessProperty = propType.replace(/[<>]/g, " ");
      let splittedProperty = arrowLessProperty.split(" ");
      return "this." + propName + " = new Array<" + splittedProperty[1] + ">();\n";
    }

  } catch (error) {
    console.log(err);
  }
}

function normalizeFoxInput(textInput) {
  try {
    let normalizedText = "";

    //Procura nova linha
    let regex = /\n/g;

    normalizedText = textInput.replace(regex, "");

    //Procura parenteses e substitui por espaço em branco
    regex = /\([^)]*\)/g;

    normalizedText = normalizedText.replace(regex, "");

    //Procura ponto e virgula
    regex = /;/g;

    normalizedText = normalizedText.replace(regex, "");

    //Procura múltiplos espaços e substitui por espaço único
    regex = /\s+/g;

    normalizedText = normalizedText.replace(regex, " ");

    //Procura virgula seguida por espaço e substitui por virgula
    regex = /,\s/g;

    normalizedText = normalizedText.replace(regex, ",");

    //Procura virgula e substitui por nova linha
    regex = /,/g;

    normalizedText = normalizedText.replace(regex, "\n");

    $("#sourceText").val(normalizedText);
  } catch (error) {
    console.log(error);
  }
}

function normalizeInput() {
  try {
    const textarea = document.getElementById("sourceText");

    textarea.value = textarea.value
        .split("\n") 
        .map(line => line.replace(/^\s+/, "")) 
        .join("\n"); 
        
  } catch (error) {
    console.log(error);
  }
}

function clearPrefix() {
  try {
    $(".prefix").val("");
  } catch (error) {
    console.log(error);
  }
}

function replaceAll() {
  try {
    let translatedText = $("#targetText").val();
    let inpFrom = $.trim($("#prefix-from").val());
    let pattern = new RegExp(inpFrom, "g");
    let inpTo = $.trim($("#prefix-to").val());

    let modifiedText = translatedText.replace(pattern, inpTo);

    $("#targetText").val(modifiedText);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Utilizei para gerar saídas assim:
 * r.ele01 = bcerqual.CER_ELE01;
 * r.qel01 = (decimal)bcerqual.CER_QEL01;
 */
function setPropertiesUsingArrayLikeFOX() {
  try {
    let propPrefix = $("#inp-prefix").val();
    let columnPrefix = $("#inp-column").val();
    let output = "";
    let total = parseInt($("#inp-total").val());

    for (let i = 1; i <= total; i++) {
      let j = strzero(i.toString(), 2);
      output += propPrefix + j + " = " + columnPrefix + j + ";\n";
    }
    $("#whiteboard").show();

    $("#whiteboard").val(output);
  } catch (error) {
    console.log(error);
  }
}

//PsNumber: número original como string
//PiDigits: quantidade de dígitos desejada
//Exemplo: quero que o número 9 seja exibido como 09 -> strzero("9", 2)
function strzero(PsNumber, PiDigits) {
  try {
    return PsNumber.padStart(PiDigits, "0");
  } catch (e) {
    console.log(e);
  }
}

function clearProps() {
  try {
    $("#inp-prefix").val("");
    $("#inp-column").val("");
    $("#inp-total").val(0);
    $("#whiteboard").val("");
    $("#whiteboard").hide();
  } catch (error) {
    console.log(error);
  }
}
