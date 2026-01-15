// TESTE DE VALIDAÇÃO DO DATA.JSON
console.log('🔍 Testando estrutura do data.json...\n');

// Simular o fetch como o dashboard faz
fetch('data.json?v=' + Date.now())
  .then(res => res.json())
  .then(DATA => {
    console.log('✅ JSON carregado com sucesso!');
    console.log('📊 Version:', DATA.version);
    console.log('📅 Meses:', DATA.months?.length);
    console.log('📝 Posts object:', typeof DATA.posts);
    
    // Testar acesso aos posts de Janeiro
    const janeiroPosts = DATA.posts?.["1"];
    console.log('\n📌 Posts de Janeiro:', janeiroPosts?.length || 0);
    
    if (janeiroPosts && janeiroPosts.length > 0) {
      console.log('✅ ESTRUTURA CORRETA!');
      janeiroPosts.forEach((post, i) => {
        console.log(`  ${i+1}. ${post.product} - ${post.date}`);
      });
    } else {
      console.log('❌ ERRO: Posts de Janeiro não encontrados!');
    }
    
    // Testar acesso aos posts de Fevereiro
    const fevereiroPosts = DATA.posts?.["2"];
    console.log('\n📌 Posts de Fevereiro:', fevereiroPosts?.length || 0);
    
    if (fevereiroPosts && fevereiroPosts.length > 0) {
      console.log('✅ ESTRUTURA CORRETA!');
      fevereiroPosts.forEach((post, i) => {
        console.log(`  ${i+1}. ${post.product} - ${post.date}`);
      });
    }
  })
  .catch(err => {
    console.error('❌ ERRO:', err.message);
  });
