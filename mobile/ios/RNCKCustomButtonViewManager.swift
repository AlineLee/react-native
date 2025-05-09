
import Foundation
import UIKit

@objc(RNCKCustomButtonManager)
class RNCKCustomButtonManager: RCTViewManager {
  override func view() -> (RNCKCustomButton) {
    return RNCKCustomButton()
  }

  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

class RNCKCustomButton: UIButton {
  
  @objc var onPress: RCTBubblingEventBlock?

   @objc var text: String = "" {
    didSet {
      self.setTitle(text, for: .normal)
    }
  }
  
  @objc var disabled: NSNumber =  0 {
    didSet {
      if(disabled.boolValue) {
        self.isEnabled = false
        self.backgroundColor = .white
        self.setTitleColor(.lightGray, for: .normal)
    
      } else {
        self.isEnabled = true
        self.backgroundColor = .lightGray
        self.setTitleColor(.white, for: .normal)
      }
    }
  }
  
  override init(frame: CGRect) {
      super.init(frame: frame)
      self.addTarget(self, action: #selector(onClick), for: .touchUpInside)
  }
  
  required init?(coder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
  }
  
  @objc func onClick() {
    guard let onPress = self.onPress else {return}
    onPress([:]);
  }
}
