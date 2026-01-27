Pod::Spec.new do |s|
  s.name           = 'ExpoVectorSearch'
  s.version        = '1.0.0'
  s.summary        = 'A sample project summary'
  s.description    = 'A sample project description'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}", "../cpp/**/*.{h,cpp,hpp}"
  
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17',
    'OTHER_CPLUSPLUSFLAGS' => '-fexceptions -DUSEARCH_USE_FP16LIB=0',
    'HEADER_SEARCH_PATHS' => '"$(PODS_TARGET_SRCROOT)/../cpp"'
  }
end
