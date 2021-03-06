window["game"] = game;
module game {
	/**
	* 结算界面
	* by zhongqing
	* (c) copyright 2018 - 2019
	* All Rights Reserved.
	* todo
	*/
	export class resultView extends PanelUI{
		private m_restart:Mbutton;
		private m_ad:Mbutton;
		private time:number = 15;
		private num:number;
		private m_score:eui.Label;
		private m_step:eui.Label;
		public constructor() {
			super();
			this.skinName="resultViewSkin";
			this.touchEnabled = false;
		}
		protected addEvent(){
			this.m_restart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startHandle,this);
			this.m_ad.addEventListener(egret.TouchEvent.TOUCH_TAP,this.adHandle,this);
		}
		protected init(){
			super.init();
			this.m_restart.size = this.m_ad.size=25;
			this.m_restart.label="重新开始";
			this.m_ad.label="看广告复活("+(this.time--)+"s)";
			this.num=setInterval(()=>{
				if(this.time<0){clearInterval(this.num);return};
				this.m_ad.label="看广告复活("+(this.time--)+"s)";
			},1000)
		}
		public setdata(step:number,time:number){
			this.m_step.text = "步数"+step+",牛逼哦";
			this.m_score.text = "总分"+Math.floor(1000000/(step*time))+",牛逼哦"
		}
		private startHandle(){
			this.close();
			EventManager.dispatchEventWith(EventNotify.SHOW_GAME,false,{dd:11});
		}		
		private adHandle(){
			clearInterval(this.num);
			//此处可调用广告接口
		}
		protected close(){
			super.close();
			PopUpManager.removePopUp(this)
		}
	}
}