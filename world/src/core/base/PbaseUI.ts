module game {
	export class PbaseUI extends ElementUI{
		protected _shape:p2.Shape;
		private _body:p2.Body;
		private _bodyOption:any;
		protected _world:p2.World;
		public constructor(bodyOption) {
			super();
			this._bodyOption=bodyOption;
		}
		protected init(){
			super.init();
			this._world = P2lib.gameWorld().initWorld();
			var pos = this.initshape();
			this.initBody(this._bodyOption);
		}
		protected initshape(){
			var factor = P2lib.factor;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
			var boxShape: p2.Shape = new p2.Box({width:this.width/factor, height:this.height/factor});
			this._shape = boxShape;
		}
		private initBody(option){
			var factor = P2lib.factor;
			var positionX: number = this.x / factor;
			var positionY: number = (egret.MainContext.instance.stage.stageHeight - this.y) / factor;
			option.position=[positionX, positionY]
			var boxBody: p2.Body = new p2.Body(option);
			boxBody.addShape(this._shape);
			this._body=boxBody;
			boxBody.displays = [this];
		}
		protected addToWorld(){
			this._world.addBody(this._body);
		}
		public get shape(){
			return this._shape;
		}
		public get body(){
			return this._body;
		}
		protected addEvent(){
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToWorld,this);
		}
		protected removeEvent(){
			
		}
	}
}