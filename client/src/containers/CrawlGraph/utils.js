/**
 * Stratify function
 *
 * Takes a flat array of node objects containing url and parent url fields, and processes 
 * it into a hierarchical structure, specifically an array containing a single object 
 * with a children array and so on. This mimics d3's stratify function, although is designed 
 * to create the specific formatting requried by react-d3-tree. Additionally, each node
 * object is also given a nodeSvgShape field specified by react-d3-tree for individual node
 * styling. More can be read here: https://github.com/bkrem/react-d3-tree#usage
 *
 * Params: nodes - flat array of nodes objects
 * Returns: data - array with a single object containing children objects
 */
export default function stratify(nodes) {
  
  let data = [];
  findTargetPath(nodes);
  seed(nodes[0], data);
  
  if(nodes.length > 1) {
    for(let i = 0; i < nodes.length; i++) 
      buildHierarchy(nodes[i], data[0]);
  }
  
  addStyling(data[0]);
  return data;

  // Finds target path from the nodes
  function findTargetPath(nodes) {    
    addTargetPathVar(nodes);
    if(nodes[nodes.length - 1].targetFound === 1)
      addTargetPath(nodes, nodes.length - 1, 0);

    // Assigns each object a "targetPath" key and value
    function addTargetPathVar(nodes) {
      for (let i = 0; i < nodes.length; i++)
        nodes[i].targetPath = 0;
    }
    
    // Recursivley determines target path by linear search
    function addTargetPath(nodes, chiIdx, iter) {
      nodes[chiIdx].targetPath = 1;
      if(nodes[chiIdx].parent != null) {
        for(let i = 0; i < nodes.length; i++) {
          if(nodes[chiIdx].parent === nodes[i].url)
            addTargetPath(nodes, i, iter);
        }
      }
    }
  }
  
  // Adds root node to hierarchy
  function seed(node, data) {
    addNodeObj(node, data);
  }

  // Adds new node object to end of array
  function addNodeObj(node, arr) {
    if(node.title) {
      arr.push({ 
        name: node.title,
        data: {
          url: node.url, 
          targetPath: node.targetPath,
          targetFound: node.targetFound,
        },
      });
    }
    else {
      arr.push({ 
        name: "No Title",
        data: {
          url: node.url, 
          targetPath: node.targetPath,
          targetFound: node.targetFound,
        },
      });
    }
  }

  // Recursively builds hierarchy 
  function buildHierarchy(node, dataObj) {
    if(dataObj.data.url === node.parent) 
      insertChild(node, dataObj);
    else if(dataObj.children) {
      for(let i = 0; i < dataObj.children.length; i++) 
        buildHierarchy(node, dataObj.children[i]);
    }        
  }

  // Inserts child node obj onto current node
  function insertChild (node, dataObj) {
    if(!dataObj.children) 
      dataObj.children = [];
    addNodeObj(node, dataObj.children);
  }

  // Recursively goes through hierarchy adding styling object
  function addStyling(dataObj) {
    styling(dataObj);
    if(dataObj.children) {
      for(let i = 0; i < dataObj.children.length; i++) 
        addStyling(dataObj.children[i]);
    }        
  }

  // Add nodeSvgShape object to nodes for individual styling
  function styling(dataObj) {

    // Add empty objects
    dataObj.nodeSvgShape = {};
    dataObj.nodeSvgShape.shapeProps = {};

    // Set size
    if(dataObj.data.targetFound) 
      dataObj.nodeSvgShape.shapeProps.r = 20;
    else 
      dataObj.nodeSvgShape.shapeProps.r = 10;

    // Set fill
    if(dataObj.children) {
      if(dataObj.data.targetPath)
        dataObj.nodeSvgShape.shapeProps.fill = "#c0f7cc";
      else
        dataObj.nodeSvgShape.shapeProps.fill = "#e8e8e8";
    } 
    else 
      dataObj.nodeSvgShape.shapeProps.fill = "#fff";

    // Set outline color
    if(dataObj.data.targetPath) {
      if(dataObj.data.targetFound)
        dataObj.nodeSvgShape.shapeProps.stroke = "#dc3545";
      else
        dataObj.nodeSvgShape.shapeProps.stroke = "#28a745";
    }
    else
      dataObj.nodeSvgShape.shapeProps.stroke = "#b7b7b7";

    // Set outline width
    if(dataObj.data.targetFound) 
      dataObj.nodeSvgShape.shapeProps.strokeWidth = 5; 
    else 
      dataObj.nodeSvgShape.shapeProps.strokeWidth = 3;

    // Set cursor when over element to pointer
    dataObj.nodeSvgShape.shapeProps.cursor = 'pointer';
  }
}
