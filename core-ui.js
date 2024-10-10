const defaultNodeTypeIndex = 1;

const cnNumbers = ['一','二','三','四','五','六','七','八','九','十'];

const exerciseTypes = [
    { label: "全部", abbr: "全部" },
    { label: "課堂練習", abbr: "練習" },
    { label: "課後作業", abbr: "作業" }
];

const exercisesData = [
    {
        index: 0, cIndex: 1,
        course: "OOP 簡介",
        scriptSrc: "/public/exercises/exercise-001.js",
        type: 1
    },
    {
        index: 1, cIndex: 2,
        course: "Object & Constructor",
        scriptSrc: "/public/exercises/exercise-002.js",
        type: 1
    },
    {
        index: 0, cIndex: 2,
        course: "Object & Constructor",
        scriptSrc: "/public/homeworks/homework-001.js",
        type: 2
    },
    {
        index: 2, cIndex: 4,
        course: "ES6：變數的解構賦值",
        scriptSrc: "/public/exercises/exercise-003.js",
        type: 1
    },
    {
        index: 3, cIndex: 5,
        course: "ES6：板模字串",
        scriptSrc: "/public/exercises/exercise-004.js",
        type: 1
    },
    {
        index: 4, cIndex: 6,
        course: "ES6：class 類別",
        scriptSrc: "/public/exercises/exercise-005.js",
        type: 1
    },
    {
        index: 1, cIndex: 6,
        course: "ES6：class 類別",
        scriptSrc: "/public/homeworks/homework-002.js",
        type: 2
    },
    {
        index: 5, cIndex: 7,
        course: "OOP : A - 封裝",
        scriptSrc: "/public/exercises/exercise-006.js",
        type: 1
    },
    {
        index: 6, cIndex: 8,
        course: "OOP : B - 繼承",
        scriptSrc: "/public/exercises/exercise-007.js",
        type: 1
    },
    {
        index: 7, cIndex: 9,
        course: "OOP : C - 多型",
        scriptSrc: "/public/exercises/exercise-008.js",
        type: 1
    },
    {
        index: 8, cIndex: 10,
        course: "OOP : 談談 THIS",
        scriptSrc: "/public/exercises/exercise-009.js",
        type: 1
    }
];

const importJSFile = (_scriptSrc) => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = _scriptSrc;

    const callback = (e) => {
        console.log(`///////////\n- 檔案 : ${_scriptSrc} 置入成功！\n///////////`);
    }

    script.onreadystatechange = callback;
    script.onload = callback;

    document.getElementsByTagName('head')[0].appendChild(script);

    // return await import(_scriptSrc);
}

const  fetchJSFileContent = async (_scriptSrc) => {
    try {
      // Fetch the JavaScript file
      const response = await fetch(_scriptSrc);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Get the file content as text
      const fileText = await response.text();

      // Display the file text in the <pre> tag
      return fileText;
    } catch (error) {
      console.error('There was a problem fetching the file:', error);
      throw new Error(error);
    }
}

function queryString(url) { 
    const str1 = url.split('?')[1]; 
    const params = {}; 
  
    if (str1) { 
        const pairs = str1.split('&'); 
        for (const pair of pairs) { 
            const [key, value] = pair.split('='); 
            params[key] = decodeURIComponent(value 
                          .replace(/\+/g, ' ')); 
        } 
    } 
  
    return params; 
} 
 

function updateHeight(node) {

    node.style.overflow = "hidden"; // Hide scrollbar
    node.style.height = "auto"; // Reset height to calculate new scrollHeight
    let newHeight = node.scrollHeight; // Get the actual content height

    newHeight = newHeight;

    // Apply smooth height transition
    if (node.style.height !== newHeight + "px") {
        smoothHeightTransition(node, newHeight);
    }
}

function smoothHeightTransition(node, newHeight) {
    requestAnimationFrame(() => {
        // Set the initial height to start the transition from
        node.style.height = node.offsetHeight + "px";
        node.offsetHeight; // Trigger reflow to ensure the transition starts from the current height
        requestAnimationFrame(() => {
        // Set the final height to transition to
        node.style.height = newHeight + "px";
        });
    });
}

function TypeSelectionList({
    list, selectedIndex = 0
}) {
    this.html = document.createElement("select");
    this.list = list;
    this.selectedIndex = selectedIndex;
    this.insertUI = ()=>{
        this.html.innerHTML = "";
        this.list.forEach((opt, index)=>{
            const option = document.createElement("option");
            option.innerHTML = opt.label;
            option.value = index;
            if (index === this.selectedIndex) {
                option.selected = true;
            }
            this.html.appendChild(option);
        });
    };
    this.insertUI();
}

function Exercise({
    index, cIndex,
    course, type,
    scriptSrc, loaded
}) {
    this.loaded = false;
    this.loading = false;
    this.type = type;
    this.html = document.createElement("div");
    this.html.setAttribute("class", `exercise-node node-${type === 1? 'exercise':'homework'}`);
    this.scriptSrc = scriptSrc;
    this.scriptContent = '';
    this.insertUI = ()=>{
        this.html.innerHTML = "";
        this.html.appendChild(
            (function NodeLabel({ cIndex, course, index, type }) {
                const node = document.createElement("div");
                node.setAttribute("class", "node-label");
                node.appendChild(
                    (function NodeP({ index, type }) {
                        const node = document.createElement("p")
                        const text = document.createTextNode(`${exerciseTypes[type].abbr}${cnNumbers[index]}`);
                        node.appendChild(text);
                        return node;
                    })({ index, type })
                );
                node.appendChild(
                    (function NodeC({ cIndex, course }) {
                        const node = document.createElement("p")
                        node.setAttribute("class", "label-desc");
                        const text = document.createTextNode(`課堂：${cIndex+1}. ${course}`);
                        node.appendChild(text);
                        return node;
                    })({ cIndex, course })
                );
                return node;
            })({ cIndex, course, index, type })
        );
        // console.log(`this.loaded : ${this.loaded}`);
        this.html.appendChild(
            (function NodeLink({ scriptSrc, loaded }) {
                
                const node = document.createElement("div");
                if (!loaded) {
                    node.setAttribute("class", "node-link");
                    const button = document.createElement("a");
                    const label = document.createTextNode(`點擊讀取`);
                    button.appendChild(label);
                    node.appendChild(button);
                    button.addEventListener("click", (e)=>{
                        loadIntentHandler(scriptSrc);
                    });
                } else {
                    node.setAttribute("class", "node-status");
                    const text = document.createElement("a");
                    const label = document.createTextNode(`來源檔案 : ${scriptSrc} →`);
                    text.setAttribute("href", scriptSrc);
                    text.setAttribute("target", "_blank");
                    text.appendChild(label);
                    node.appendChild(text);
                }
                return node;
            })({ scriptSrc, loaded: this.loaded })
        );
        if (this.loaded) {
            this.html.appendChild(
                (function NodeScriptContent({ scriptContent }) {
                    const node = document.createElement("div");
                    node.setAttribute("class", "node-textarea");
                    const textArea = document.createElement("textarea");
                    textArea.value = scriptContent;
                    textArea.readOnly = true;
                    node.appendChild(textArea);
                    setTimeout(()=>{
                        updateHeight(textArea);
                    },10);
                    return node;
                })({
                    scriptContent: this.scriptContent
                })
            );
        }
    }

    const loadIntentHandler = async (scriptSrc)=>{
        console.log(`///////////`);
        console.log(`- 檔案 : ${scriptSrc} 開始讀取...`);
        // const module = await importJSFile(scriptSrc);

        const scriptContent = await fetchJSFileContent(scriptSrc);
        setLoadedState({
            loaded: true,
            scriptContent: scriptContent
        });
        
        console.log(`- 檔案 : ${scriptSrc} 讀取完畢！`);
        console.log(`///////////`);
        importJSFile(scriptSrc);
    }

    const setLoadedState = ({
        loaded, scriptContent
    }) => {
        this.loaded = loaded;
        this.scriptContent = scriptContent;
        this.insertUI();
    }

    if (loaded) {
        loadIntentHandler(this.scriptSrc);
    } else {
        this.insertUI();    
    }
    
}

const fillExercisesList = (listOfObj, listTypeObj, target) => {
    target.innerHTML = "";
    target.appendChild(listTypeObj.html);
    listOfObj.forEach((obj, index)=>{
        if (parseInt(listTypeObj.selectedIndex) > 0) {
            if (obj.type === listTypeObj.selectedIndex)
                target.appendChild(obj.html);
        } else {
            console.log('All IN');
            target.appendChild(obj.html);
        }
    });
};

const { index: excLoadedIndex, type: typeIndex } = queryString(window.location.href);

const listTypeSelectionObject = new TypeSelectionList({
    list: exerciseTypes,
    selectedIndex: typeIndex !== undefined ? parseInt(typeIndex) : defaultNodeTypeIndex
});

const exercisesObject = exercisesData.map(({ index, type, ...data })=>{
    return new Exercise({
        ...data,
        index, type,
        ...(
            parseInt(excLoadedIndex) === index &&
            parseInt(typeIndex) === type ?
                { loaded : true } : null
        )
    });
});

const pool = document.querySelector("#exercise-list");

fillExercisesList(exercisesObject, listTypeSelectionObject, pool);

listTypeSelectionObject.html.addEventListener("change", ({target})=>{
    listTypeSelectionObject.selectedIndex = parseInt(target.value);
    fillExercisesList(exercisesObject, listTypeSelectionObject, pool);
});