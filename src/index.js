import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, ContentBlock, CompositeDecorator} from "draft-js";

function onChange(editorState) {
  this.setState({ editorState });
}


// Note: these aren't very good regexes, don't use them!
const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const PONY_REGEX = /\*\*(pony|unicorn)/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function ponyStrategy(contentBlock, callback, contentState) {
  findWithRegex(PONY_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HandleSpan = (props) => {
  return (<span style={{backgroundColor:"red", opacity:"0.5", color: "white"}}>{props.children}</span>);
};

const HashtagSpan = (props) => {
  return (<span style={{backgroundColor:"green", opacity:"0.5", color: "white"}}>{props.children}</span>);
};

const ponyComponent = (props) => {
  return <iframe src={"https://panzi.github.io/Browser-Ponies/ponies-iframe.html#fadeDuration=500&volume=1&fps=25&speed=3&audioEnabled=false&showFps=false&showLoadProgress=true&speakProbability=0.1&spawn.applejack=1&spawn.fluttershy=1&spawn.pinkie%20pie=1&spawn.rainbow%20dash=1&spawn.rarity=1&spawn.twilight%20sparkle=1&paddock=true&grass=true"} style={{overflow:"hidden", borderStyle:"none", margin:"0", padding:"0", background: "transparent", width:"640px", height:"480px"}} width={"640"} height={"480"} frameborder={"0"} scrolling={"no"} marginheight={"0"} marginwidth={"0"}></iframe>
}


class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HandleSpan,
      },
      {
        strategy: hashtagStrategy,
        component: HashtagSpan,
      },
      {
        strategy: ponyStrategy,
        component: ponyComponent,
      },
    ]);

    this.state = {
      editorState: EditorState.set(EditorState.createEmpty(), {decorator: compositeDecorator}),
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (
      <div>
        <h2>PONY</h2>
        <hr/>
        <div style={{border: "1px solid gray", padding: "10px"}}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById("root")
);
