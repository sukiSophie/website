// 图片懒加载实现
document.addEventListener("DOMContentLoaded", function() {
    // 处理带有lazy-image类的图片元素
    const lazyImages = document.querySelectorAll('.lazy-image');
    // 处理带有lazy-background类的背景图片元素
    const lazyBackgrounds = document.querySelectorAll('.lazy-background');
    
    // 创建IntersectionObserver实例
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            // 当元素进入视口
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // 如果是背景图片元素
                if (target.classList.contains('lazy-background')) {
                    // 获取内联样式中的背景图片URL
                    const style = target.getAttribute('style');
                    if (style) {
                        // 应用背景图片
                        target.style.backgroundImage = style.split('background-image: ')[1];
                        // 移除懒加载标记
                        target.classList.remove('lazy-background');
                        target.removeAttribute('data-src');
                    }
                }
                // 如果是普通图片元素
                else if (target.classList.contains('lazy-image')) {
                    // 如果有data-src属性，则加载该图片
                    if (target.dataset.src) {
                        target.src = target.dataset.src;
                        target.removeAttribute('data-src');
                    }
                    // 移除懒加载标记
                    target.classList.remove('lazy-image');
                }
                
                // 停止观察已加载的元素
                observer.unobserve(target);
            }
        });
    }, {
        // 根元素
        root: null,
        // 根元素的边距
        rootMargin: '0px',
        // 元素可见度达到多少比例时触发回调
        threshold: 0.1
    });
    
    // 开始观察所有懒加载图片
    lazyImages.forEach(function(image) {
        imageObserver.observe(image);
    });
    
    // 开始观察所有懒加载背景图片
    lazyBackgrounds.forEach(function(background) {
        imageObserver.observe(background);
    });
    
    // 对于不支持IntersectionObserver的浏览器，提供回退方案
    if (!('IntersectionObserver' in window)) {
        // 简单的回退：立即加载所有图片
        lazyImages.forEach(function(image) {
            if (image.dataset.src) {
                image.src = image.dataset.src;
            }
        });
        
        lazyBackgrounds.forEach(function(background) {
            const style = background.getAttribute('style');
            if (style) {
                background.style.backgroundImage = style.split('background-image: ')[1];
            }
        });
    }
});