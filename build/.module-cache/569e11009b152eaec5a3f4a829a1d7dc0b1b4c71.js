/**
 * @jsx React.DOM
 */
var converter = new Showdown.converter();

var CommentBox = React.createClass({displayName: 'CommentBox',
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
      React.DOM.div( {className:"commentBox"}, 
        React.DOM.h1(null, "Comments"),
        CommentsList( {data:this.state.data} ),
        CommentForm(null )
      )
    );
  }
});

var CommentsList = React.createClass({displayName: 'CommentsList',
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return Comment( {author:comment.author}, comment.text)
    });
    return (
      React.DOM.div( {className:"commentsList"}, 
        commentNodes
      )
    );
  }
});

var CommentForm = React.createClass({displayName: 'CommentForm',
  render: function() {
    return (
      React.DOM.div( {className:"commentForm"}, 
        " Hello I am a CommentForm "
      )
    );
  }
});

var Comment = React.createClass({displayName: 'Comment',
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      React.DOM.div( {className:"comment"}, 
        React.DOM.h2( {className:"commentAuthor"}, 
          this.props.author
        ),
        React.DOM.span( {dangerouslySetInnerHTML:{__html: rawMarkup}} )
      )
    );
  }
});

React.renderComponent(
  CommentBox( {url:"comments.json", pollInterval:2000} ),
  document.getElementById('content')
      );