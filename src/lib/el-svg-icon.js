import * as components from '@element-plus/icons-vue'
// 將 Element Plus 提供的 icon 全部進行註冊，不需再各自匯入
export default {
	install: (app) => {
		for (const key in components) {
			const componentConfig = components[key];
			app.component(componentConfig.name, componentConfig);
		}
	},
};
