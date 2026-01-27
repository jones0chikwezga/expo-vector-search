#include "ExpoVectorSearch.h"
#include <jni.h>
#include <jsi/jsi.h>

extern "C" JNIEXPORT void JNICALL
Java_expo_modules_vectorsearch_ExpoVectorSearchModule_nativeInstall(
    JNIEnv *env, jobject thiz, jlong jsiPtr) {
  auto runtime = reinterpret_cast<facebook::jsi::Runtime *>(jsiPtr);
  if (runtime) {
    expo::vectorsearch::install(*runtime);
  }
}