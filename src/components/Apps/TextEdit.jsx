import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';
import useFileSystemStore from '../../store/fileSystemStore';

const TextEdit = ({ windowId, filePath }) => {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled.txt');
  const [isModified, setIsModified] = useState(false);
  const { getFile, updateFileContent, createFile } = useFileSystemStore();

  useEffect(() => {
    if (filePath) {
      const file = getFile(filePath);
      if (file && file.type === 'file') {
        setContent(file.content || '');
        setFileName(file.name);
        setIsModified(false);
      }
    }
  }, [filePath, getFile]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setIsModified(true);
  };

  const handleSave = () => {
    if (filePath) {
      const pathParts = filePath.split('/');
      const name = pathParts[pathParts.length - 1];
      updateFileContent(name, content);
    } else {
      const name = prompt('Enter file name:', fileName);
      if (name) {
        createFile(name, content, 'txt');
        setFileName(name);
      }
    }
    setIsModified(false);
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FileText size={20} className="text-gray-600" />
          <span className="text-sm font-medium">
            {fileName}{isModified ? ' •' : ''}
          </span>
        </div>
        
        <button
          onClick={handleSave}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-1"
        >
          <Save size={16} />
          <span>Save</span>
        </button>
      </div>

      {/* Text Editor */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          placeholder="Start typing..."
          className="w-full h-full resize-none border-none outline-none font-mono text-sm leading-relaxed"
          style={{ fontFamily: 'SF Mono, Monaco, Consolas, monospace' }}
        />
      </div>
    </div>
  );
};

export default TextEdit;