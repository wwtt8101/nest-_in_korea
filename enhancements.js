// Interactive detail sheets and practical guidance. Browser storage is local to this device.
const contractTips={
'부동산 정보 확인':'집의 주소, 층수, 호수를 실제 방문한 집과 비교하세요. 건축물대장 등 공식 자료도 확인하세요.',
'계약 당사자 확인':'계약 상대방이 실제 소유자인지 확인하세요. 대리인이라면 위임 관계를 확인하세요.',
'보증금 및 월세 금액':'보증금, 월세, 관리비, 납부일과 납부 계좌를 계약서에 명확히 적으세요.',
'계약 기간':'입주일, 종료일, 갱신 및 해지 조건을 확인하세요.',
'특약 사항':'수리, 청소, 원상복구와 같은 약속은 구두가 아닌 문서에 남기세요.',
'주소와 호수':'실제 계약할 주택의 주소와 호수가 정확한지 확인하세요.',
'임대인 정보':'임대인의 성명과 계약 당사자 정보를 확인하세요.',
'보증금 반환 조건':'계약 종료 시 보증금 반환 시점과 조건을 확인하세요.',
'관리비 포함 항목':'인터넷, 수도, 난방 등 포함 여부와 별도 비용을 확인하세요.',
'수리 책임':'고장 및 수리비를 누가 부담하는지 확인하세요.',
'등기부등본 확인':'등기사항증명서의 소유자와 권리관계를 확인하세요.',
'송금 계좌 확인':'입금 전에 계좌 명의와 계약서 내용을 다시 확인하세요.',
'계약서 사본 보관':'서명한 계약서와 송금 내역을 안전하게 보관하세요.',
'이해 안 되는 조항 질문':'서명 전에 충분히 설명을 듣고, 필요하면 학교 국제처 또는 전문 상담을 이용하세요.'};
const adminTips={
'체류지 변경신고':'등록 외국인은 체류지를 변경하면 일반적으로 전입한 날부터 15일 이내에 신고해야 합니다. 대상·방법·기한은 출입국·외국인청 또는 하이코리아에서 최신 정보를 확인하세요.',
'공과금 명의 변경':'전기·가스·수도·인터넷 계약 및 요금 납부 방식을 집주인이나 공급 업체에 확인하세요.',
'주민등록 관련 주소 변경':'주민등록 전입신고는 일반적으로 한국 국민 대상 제도입니다. 외국인은 자신의 체류지 변경신고 절차를 우선 확인하세요.',
'은행 계좌 및 주소 정보':'은행에 등록된 연락처와 주소를 갱신할 필요가 있는지 확인하세요.',
'휴대폰 개통':'통신사별로 본인확인에 필요한 서류가 다릅니다. 외국인등록증 등 필요한 서류를 확인하세요.',
'건강보험 정보 확인':'가입 자격과 등록 주소 등 정보 변경 필요 여부를 국민건강보험공단에 확인하세요.'};
function showDetail(title,body){document.getElementById('detailTitle').textContent=title;document.getElementById('detailBody').textContent=body;document.getElementById('detailOverlay').classList.add('open')}
function closeDetail(){document.getElementById('detailOverlay').classList.remove('open')}
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail()});
const originalContractTab=contractTab;
contractTab=function(n,button){originalContractTab(n,button);document.querySelectorAll('#contractList .row').forEach((el,i)=>{const title=contractData[n][i];el.setAttribute('role','button');el.tabIndex=0;el.onclick=()=>showDetail(title,contractTips[title]||'계약 전에 내용을 확인하세요.');el.onkeydown=e=>{if(e.key==='Enter')el.click()}})};
const originalGo=go;
go=function(id){originalGo(id);if(id==='contract'){const b=document.querySelector('#contract .tabs button.selected')||document.querySelector('#contract .tabs button');const idx=[...document.querySelectorAll('#contract .tabs button')].indexOf(b);contractTab(Math.max(0,idx),b)}};
const adminNodes=document.querySelectorAll('#adminList .row');adminNodes.forEach((el,i)=>{const [title]=adminItems[i];el.setAttribute('role','button');el.tabIndex=0;el.onclick=()=>showDetail(title,adminTips[title]);el.onkeydown=e=>{if(e.key==='Enter')el.click()}});
const searchBox=document.getElementById('search');if(searchBox){searchBox.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=searchBox.value.trim();if(!q)return;const found=Object.entries({...contractTips,...adminTips}).find(([k,v])=>(k+' '+v).includes(q));if(found)showDetail(...found);else showDetail('검색 결과',`“${q}”에 대한 일치 항목이 없어요. 계약서 확인 또는 입주 후 행정절차 메뉴를 확인해 주세요.`)}})}
if('serviceWorker'in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
