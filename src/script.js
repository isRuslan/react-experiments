/**
 * @jsx React.DOM
 */
var converter = new Showdown.converter();

var CommentBox = React.createClass({
  loadFromServer: function() {
    $.ajax({
      url: this.props.url,
      success: function(data) {;
        this.setState({data: data});
      }.bind(this)
    });
  },
  getInitialState: function() {
    $.ajax({
      url: this.props.url,
      success: function(data) {;
        this.setState({data: data});
      }.bind(this)
    });
    return {data: []};
  },
  componentsWillMount: function() {
    this.loadFromServer();
    setInterval(this.loadFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentsList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

var CommentsList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return <Comment author={comment.author}>{comment.text}</Comment>
    });
    return (
      <div className="commentsList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello I am a CommentForm
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

React.renderComponent(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
