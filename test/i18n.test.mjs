import test from 'node:test'
import assert from 'node:assert/strict'
import {catalog} from '../src/i18n/catalog.js'
import {languages} from '../src/i18n/languages.js'
import {translate} from '../src/i18n/translate.js'
test('all 22 scheduled languages have the same complete set of 71 core UI translations',()=>{
 assert.equal(languages.length,23);assert.equal(Object.keys(catalog).length,22)
 const keys=Object.keys(catalog.hi).sort();assert.equal(keys.length,71)
 for(const l of languages.filter(l=>l.code!=='en')){assert.deepEqual(Object.keys(catalog[l.code]).sort(),keys);for(const key of keys){assert.ok(catalog[l.code][key].trim());assert.notEqual(catalog[l.code][key],key)}}
})
test('RTL languages and fallback behaviour are explicit; arbitrary notes stay unchanged',()=>{
 assert.deepEqual(languages.filter(l=>l.dir==='rtl').map(l=>l.code).sort(),['ks','sd','ur'])
 assert.equal(translate('Save','hi'),'सहेजें');assert.equal(translate('Log in','ta'),'உள்நுழைக')
 assert.equal(translate('My private medical note','hi'),'My private medical note');assert.equal(translate('Save','unknown'),'Save')
 assert.equal(translate('pending','ur'),catalog.ur.Pending);assert.equal(translate('confirmed','hi'),'confirmed')
})
