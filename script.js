
        // 硬编码的便签数据 - 按照ColorOS 16的存储方式
        // 所有数据直接嵌入在JavaScript代码中

           const hardcodedNotes = [
            {
                id: 1,
                title: "项目计划会议要点",
                content: "1. 确定项目时间线\n2. 分配团队成员任务\n3. 确定技术栈选择\n4. 制定风险管理计划",
                tags: ["工作", "会议", "项目"],
                category: "work",
                pinned: true,
                color: "#dbeafe",
                date: "2023-10-15",
                type: "text"
            },
            {
                id: 2,
                title: "购物清单",
                content: "- 牛奶\n- 鸡蛋\n- 面包\n- 水果\n- 蔬菜",
                tags: ["个人", "购物"],
                category: "personal",
                pinned: false,
                color: "#fef3c7",
                date: "2023-10-14",
                type: "list"
            },
            {
                id: 3,
                title: "读书笔记 - 《设计心理学》",
                content: "好的设计应该符合用户的直觉，减少学习成本。诺曼提出了设计心理学的七个基本原则，其中最重要的就是可视性和反馈。",
                tags: ["阅读", "学习", "设计"],
                category: "ideas",
                pinned: true,
                color: "#d1fae5",
                date: "2023-10-13",
                type: "text"
            },
            {
                id: 4,
                title: "健身计划",
                content: "周一：胸部训练\n周二：背部训练\n周三：有氧运动\n周四：肩部训练\n周五：腿部训练\n周末：休息",
                tags: ["健康", "健身"],
                category: "personal",
                pinned: false,
                color: "#ffffff",
                date: "2023-10-12",
                type: "text"
            },
            {
                id: 5,
                title: "有用的前端开发资源",
                content: "MDN Web Docs: https://developer.mozilla.org\nCSS Tricks: https://css-tricks.com\nFrontend Masters: https://frontendmasters.com",
                tags: ["开发", "资源", "前端"],
                category: "work",
                pinned: false,
                color: "#f3e8ff",
                date: "2023-10-11",
                type: "link"
            },
            {
                id: 6,
                title: "旅行计划",
                content: "目的地：日本京都\n时间：2024年春季\n预算：15000元\n景点：清水寺、金阁寺、伏见稻荷大社",
                tags: ["旅行", "计划"],
                category: "personal",
                pinned: true,
                color: "#fef3c7",
                date: "2023-10-10",
                type: "text"
            },
            {
                id: 7,
                title: "React学习要点",
                content: "1. 组件化思想\n2. 状态管理\n3. 生命周期\n4. Hooks使用\n5. 性能优化",
                tags: ["React", "前端", "学习"],
                category: "work",
                pinned: false,
                color: "#dbeafe",
                date: "2023-10-09",
                type: "list"
            },
            {
                id: 8,
                title: "周末电影推荐",
                content: "《星际穿越》- 诺兰的科幻经典\n《寄生虫》- 奥斯卡最佳影片\n《教父》- 黑帮电影巅峰",
                tags: ["娱乐", "电影"],
                category: "personal",
                pinned: false,
                color: "#ffffff",
                date: "2023-10-08",
                type: "text"
            }
        ];

        // 应用状态
        const state = {
            notes: [...hardcodedNotes],
            currentCategory: 'all',
            editingNote: null,
            tags: [],
            currentColor: '#ffffff'
        };

        // DOM元素
        const notesGrid = document.getElementById('notesGrid');
        const noteEditorOverlay = document.getElementById('noteEditorOverlay');
        const noteTitle = document.getElementById('noteTitle');
        const noteContent = document.getElementById('noteContent');
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        const cancelEditBtn = document.getElementById('cancelEditBtn');
        const closeEditorBtn = document.getElementById('closeEditorBtn');
        const addNoteBtn = document.getElementById('addNoteBtn');
        const exportBtn = document.getElementById('exportBtn');
        const tagInput = document.getElementById('tagInput');
        const tagsContainer = document.getElementById('tagsContainer');
        const colorOptions = document.querySelectorAll('.color-option');
        const noteCategory = document.getElementById('noteCategory');
        const togglePinBtn = document.getElementById('togglePinBtn');
        const categoryItems = document.querySelectorAll('.category-item');
        const contentTypeBtns = document.querySelectorAll('.content-type-btn');
        const imageUploadArea = document.getElementById('imageUploadArea');
        const linkInputArea = document.getElementById('linkInputArea');
        const listInputArea = document.getElementById('listInputArea');
        const imageUrl = document.getElementById('imageUrl');
        const linkUrl = document.getElementById('linkUrl');
        const linkText = document.getElementById('linkText');
        const listItems = document.getElementById('listItems');
        const imageUpload = document.getElementById('imageUpload');
        const imagePreview = document.getElementById('imagePreview');
        
        // 统计元素
        const totalNotesEl = document.getElementById('totalNotes');
        const pinnedNotesEl = document.getElementById('pinnedNotes');
        const charCountEl = document.getElementById('charCount');

        // 初始化
        function init() {
            renderNotes();
            updateStats();
            setupEventListeners();
        }

        // 设置事件监听器
        function setupEventListeners() {
            // 分类筛选
            categoryItems.forEach(item => {
                item.addEventListener('click', () => {
                    categoryItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    state.currentCategory = item.dataset.category;
                    renderNotes();
                });
            });

            // 新建便签按钮
            addNoteBtn.addEventListener('click', () => openEditor());

            // 保存便签
            saveNoteBtn.addEventListener('click', saveNote);

            // 取消编辑
            cancelEditBtn.addEventListener('click', closeEditor);
            closeEditorBtn.addEventListener('click', closeEditor);

            // 导出数据
            exportBtn.addEventListener('click', exportData);

            // 标签输入
            tagInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && tagInput.value.trim()) {
                    addTag(tagInput.value.trim());
                    tagInput.value = '';
                }
            });

            // 颜色选择
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    colorOptions.forEach(o => o.classList.remove('active'));
                    option.classList.add('active');
                    state.currentColor = option.dataset.color;
                });
            });

            // 置顶按钮
            togglePinBtn.addEventListener('click', () => {
                togglePinBtn.classList.toggle('active');
            });

            // 内容类型切换
            contentTypeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    contentTypeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // 显示对应的输入区域
                    const type = btn.dataset.type;
                    noteContent.style.display = type === 'text' ? 'block' : 'none';
                    imageUploadArea.style.display = type === 'image' ? 'block' : 'none';
                    linkInputArea.style.display = type === 'link' ? 'block' : 'none';
                    listInputArea.style.display = type === 'list' ? 'block' : 'none';
                });
            });

            // 图片上传预览
            imageUpload.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        imagePreview.innerHTML = `<img src="${event.target.result}" alt="预览" class="content-image" style="max-width: 200px;">`;
                        imageUrl.value = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // 渲染便签
        function renderNotes() {
            notesGrid.innerHTML = '';
            
            // 筛选便签
            let filteredNotes = [...state.notes];
            if (state.currentCategory !== 'all') {
                if (state.currentCategory === 'pinned') {
                    filteredNotes = filteredNotes.filter(note => note.pinned);
                } else {
                    filteredNotes = filteredNotes.filter(note => note.category === state.currentCategory);
                }
            }
            
            // 置顶的便签排前面
            filteredNotes.sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return new Date(b.date) - new Date(a.date);
            });
            
            if (filteredNotes.length === 0) {
                notesGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-sticky-note"></i>
                        <h3>暂无便签</h3>
                        <p>点击"新建便签"按钮创建第一个便签</p>
                    </div>
                `;
                return;
            }
            
            filteredNotes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = `note-card ${note.pinned ? 'pinned' : ''}`;
                noteElement.style.backgroundColor = note.color;
                noteElement.dataset.id = note.id;
                
                // 根据类型显示不同的内容预览
                let contentPreview = note.content;
                if (note.type === 'link') {
                    contentPreview = `🔗 ${note.content.split('\n')[0]}`;
                } else if (note.type === 'list') {
                    contentPreview = `📋 ${note.content.split('\n')[0]}`;
                } else if (note.type === 'image') {
                    contentPreview = '🖼️ [图片]';
                }
                
                noteElement.innerHTML = `
                    <h3 class="note-title">${note.title}</h3>
                    <div class="note-tags">
                        ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
                </div>
                    <div class="note-content">${contentPreview}</div>
                    <div class="note-footer">
                        <div class="note-date">
                            <i class="far fa-calendar"></i>
                            <span>${formatDate(note.date)}</span>
                        </div>
                        <div class="note-actions">
                            <button class="note-action-btn edit-btn" title="编辑">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="note-action-btn delete-btn" title="删除">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                // 添加编辑和删除事件
                const editBtn = noteElement.querySelector('.edit-btn');
                const deleteBtn = noteElement.querySelector('.delete-btn');
                
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEditor(note.id);
                });
                
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                });
                
                noteElement.addEventListener('click', () => {
                    openEditor(note.id);
                });
                
                notesGrid.appendChild(noteElement);
            });
        }

        // 打开编辑器
        function openEditor(noteId = null) {
            noteEditorOverlay.classList.add('active');
            
            if (noteId) {
                // 编辑现有便签
                const note = state.notes.find(n => n.id === noteId);
                if (note) {
                    state.editingNote = note;
                    noteTitle.value = note.title;
                    noteContent.value = note.content;
                    noteCategory.value = note.category;
                    state.currentColor = note.color;
                    state.tags = [...note.tags];
                    
                    // 设置颜色选择
                    colorOptions.forEach(option => {
                        option.classList.toggle('active', option.dataset.color === note.color);
                    });
                    
                    // 设置置顶按钮状态
                    togglePinBtn.classList.toggle('active', note.pinned);
                    
                    // 设置内容类型
                    contentTypeBtns.forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.type === note.type);
                    });
                    
                    // 显示对应内容区域
                    const type = note.type;
                    noteContent.style.display = type === 'text' ? 'block' : 'none';
                    imageUploadArea.style.display = type === 'image' ? 'block' : 'none';
                    linkInputArea.style.display = type === 'link' ? 'block' : 'none';
                    listInputArea.style.display = type === 'list' ? 'block' : 'none';
                    
                    // 设置内容
                    if (type === 'image') {
                        imageUrl.value = note.imageUrl || '';
                    } else if (type === 'link') {
                        const linkParts = note.content.split('\n');
                        linkUrl.value = linkParts[0] || '';
                        linkText.value = linkParts[1] || '';
                    } else if (type === 'list') {
                        listItems.value = note.content;
                    }
                }
            } else {
                // 新建便签
                state.editingNote = null;
                noteTitle.value = '';
                noteContent.value = '';
                noteCategory.value = 'work';
                state.currentColor = '#ffffff';
                state.tags = [];
                togglePinBtn.classList.remove('active');
                
                // 重置内容类型为文本
                contentTypeBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.type === 'text');
                });
                noteContent.style.display = 'block';
                imageUploadArea.style.display = 'none';
                linkInputArea.style.display = 'none';
                listInputArea.style.display = 'none';
                imageUrl.value = '';
                linkUrl.value = '';
                linkText.value = '';
                listItems.value = '';
                imagePreview.innerHTML = '';
            }
            
            renderTags();
        }

        // 关闭编辑器
        function closeEditor() {
            noteEditorOverlay.classList.remove('active');
            state.editingNote = null;
        }

        // 保存便签
        function saveNote() {
            const title = noteTitle.value.trim();
            if (!title) {
                alert('请输入便签标题');
                return;
            }
            
            // 获取内容（根据类型）
            const activeType = document.querySelector('.content-type-btn.active').dataset.type;
            let content = '';
            
            if (activeType === 'text') {
                content = noteContent.value;
            } else if (activeType === 'image') {
                content = imageUrl.value;
                if (!content) {
                    alert('请输入图片链接或上传图片');
                    return;
                }
            } else if (activeType === 'link') {
                const url = linkUrl.value.trim();
                const text = linkText.value.trim() || url;
                if (!url) {
                    alert('请输入链接地址');
                    return;
                }
                content = `${url}\n${text}`;
            } else if (activeType === 'list') {
                content = listItems.value;
            }
            
            const noteData = {
                id: state.editingNote ? state.editingNote.id : Date.now(),
                title,
                content,
                tags: [...state.tags],
                category: noteCategory.value,
                pinned: togglePinBtn.classList.contains('active'),
                color: state.currentColor,
                date: state.editingNote ? state.editingNote.date : new Date().toISOString().split('T')[0],
                type: activeType
            };
            
            if (state.editingNote) {
                // 更新现有便签
                const index = state.notes.findIndex(n => n.id === state.editingNote.id);
                if (index !== -1) {
                    state.notes[index] = noteData;
                }
            } else {
                // 添加新便签
                state.notes.unshift(noteData);
            }
            
            renderNotes();
            updateStats();
            closeEditor();
            
            // 显示成功消息
            showMessage(`便签已${state.editingNote ? '更新' : '创建'}！`);
        }

        // 删除便签
        function deleteNote(noteId) {
            if (confirm('确定要删除这个便签吗？')) {
                state.notes = state.notes.filter(note => note.id !== noteId);
                renderNotes();
                updateStats();
                showMessage('便签已删除！');
            }
        }

        // 添加标签
        function addTag(tagText) {
            if (state.tags.includes(tagText)) return;
            state.tags.push(tagText);
            renderTags();
        }

        // 移除标签
        function removeTag(tagText) {
            state.tags = state.tags.filter(tag => tag !== tagText);
            renderTags();
        }

        // 渲染标签
        function renderTags() {
            tagsContainer.innerHTML = '';
            state.tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag';
                tagElement.innerHTML = `
                    ${tag}
                    <span class="tag-remove" data-tag="${tag}">&times;</span>
                `;
                tagsContainer.appendChild(tagElement);
                
                // 添加删除标签事件
                tagElement.querySelector('.tag-remove').addEventListener('click', (e) => {
                    e.stopPropagation();
                    removeTag(tag);
                });
            });
        }

        // 导出数据 - 修改为导出完整的JavaScript文件
        function exportData() {
            // 获取当前script标签中的所有代码
            const scriptElement = document.getElementById('mainScript');
            let scriptContent = scriptElement.textContent;
            
            // 替换硬编码的便签数据为当前所有便签数据
            // 找到hardcodedNotes的定义并替换
            const notesDataString = JSON.stringify(state.notes, null, 4);
            const updatedScriptContent = scriptContent.replace(
                /const hardcodedNotes = \[[\s\S]*?\];/,
                `const hardcodedNotes = ${notesDataString};`
            );
            
            // 构建完整的JavaScript文件内容
            const exportContent = `// ColorOS 16 便签系统 - 完整数据导出
// 导出时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
// 便签总数: ${state.notes.length}
// 此文件包含完整的应用程序代码和所有便签数据

${updatedScriptContent}

// 导出完成信息
console.log('ColorOS 16 便签系统数据导出完成！');
console.log('导出时间:', '${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}');
console.log('便签总数:', ${state.notes.length});
console.log('便签数据已硬编码在hardcodedNotes变量中');
console.log('将此文件保存为.html文件即可在浏览器中运行完整的便签系统');

// 初始化应用（如果环境允许）
if (typeof init === 'function') {
    init();
}`;
            
            // 创建下载链接
            const blob = new Blob([exportContent], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `coloros-notes-complete-export-${new Date().toISOString().split('T')[0]}.js`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showMessage(`已导出完整的JavaScript文件，包含 ${state.notes.length} 条便签数据和所有应用程序代码！`);
        }

        // 更新统计信息
        function updateStats() {
            totalNotesEl.textContent = state.notes.length;
            pinnedNotesEl.textContent = state.notes.filter(note => note.pinned).length;
            
            // 计算总字符数
            let totalChars = 0;
            state.notes.forEach(note => {
                totalChars += note.title.length + note.content.length;
            });
            charCountEl.textContent = totalChars.toLocaleString();
        }

        // 格式化日期
        function formatDate(dateString) {
            const date = new Date(dateString);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (date.toDateString() === today.toDateString()) {
                return '今天';
            } else if (date.toDateString() === yesterday.toDateString()) {
                return '昨天';
            } else {
                return dateString;
            }
        }

        // 显示消息
        function showMessage(message) {
            // 创建消息元素
            const messageEl = document.createElement('div');
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--color-primary);
                color: white;
                padding: 12px 20px;
                border-radius: var(--radius-sm);
                box-shadow: var(--shadow-md);
                z-index: 1001;
                animation: fadeInOut 3s ease;
            `;
            
            document.body.appendChild(messageEl);
            
            // 添加动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(10px); }
                    15% { opacity: 1; transform: translateY(0); }
                    85% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(10px); }
                }
            `;
            document.head.appendChild(style);
            
            // 3秒后移除消息
            setTimeout(() => {
                document.body.removeChild(messageEl);
                document.head.removeChild(style);
            }, 3000);
        }

        // 初始化应用
        init();
    