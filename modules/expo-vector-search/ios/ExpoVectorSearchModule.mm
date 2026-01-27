#import "ExpoVectorSearchModule.h"
#import "../cpp/ExpoVectorSearch.h"
#import <ExpoModulesCore/EXJavaScriptRuntime.h>
#import <jsi/jsi.h>

@implementation ExpoVectorSearchJSI

+ (void)install:(id)runtimeObj {
  EXJavaScriptRuntime *runtime = (EXJavaScriptRuntime *)runtimeObj;
  facebook::jsi::Runtime *jsiRuntime = [runtime get];
  if (jsiRuntime) {
    expo::vectorsearch::install(*jsiRuntime);
  }
}

@end

// Force rebuild of JSI module - v2
